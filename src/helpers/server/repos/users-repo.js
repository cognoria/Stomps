import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import crypto from "crypto"
import { cookies, headers } from 'next/headers';
import { db } from '../db';
import { hashToken } from '../../cryptography';
import { emailTemplate, getEmailText } from '../email/emailTemplate';
import { logUserActivity } from './logs-repo';
import { GoogleVerifier } from '../oauth.Google';
import elasticMailSender from '../email/elasticSender';
import { tokenRepo, globalRepo } from './';

const User = db.User;
const Token = db.Token;

export const usersRepo = {
    authenticate,
    getAll,
    getById,
    getCurrent,
    create,
    update,
    veryfyUser, //
    delete: _delete,
    googleAuth,
    forgetPassword,
    resetPassword,
    allUserCount,
    resendVerificationEmail,
};

async function authenticate({ email, password }) {
    const user = await User.findOne({ email });

    if (!(user && await bcrypt.compareSync(password, user.hash))) {
        throw 'Username or password is incorrect';
    }

    if (!user.isVerified) throw 'Please Verify your email address first';

    // create a jwt token that is valid for 7 days
    //TODO: JWT_Secret will be created randomly and saved for the user
    const token = jwt.sign({ sub: user.id }, process.env.JWT_SECRET, { expiresIn: '30d' });
    const expires = 30 * 24 * 60 * 60 * 1000
    cookies().set('token', token, { secure: true, httpOnly: true, expires: Date.now() + expires })
    await logUserActivity(user.id, 'User Login', { ip: headers().get('X-Forwarded-For') })
    return {
        user: user.toJSON(),
        token
    };
}

async function getAll() {
    return await User.find();
}

async function getById(id) {
    try {
        return await User.findById(id);
    } catch {
        throw 'User Not Found';
    }
}

async function getCurrent() {
    try {
        const currentUserId = headers().get('userId');
        return await User.findById(currentUserId);
    } catch {
        throw 'Current User Not Found';
    }
}

async function allUserCount(){
    return await User.countDocuments()
}

/**
 * create a new user
 * @param {User<Object>} params 
 * @returns 
 */
async function create(params) {
    // validate
    if (await User.findOne({ email: params.email })) {
        throw 'User "' + params.email + '"  already exist';
    }

    const currentUserCount = await User.countDocuments();
    if (currentUserCount >= 1) {
        throw 'You cannot register. contact support@stomps.io';
    }

    const hash = bcrypt.hashSync(params.password, 10);
    const user = await User.create({
        email: params.email,
        hash,
        isVerified: true,
        security: params.security
    });

    //log user register
    await logUserActivity(user.id, 'User Register', { ip: headers().get('X-Forwarded-For'), email: params.email })
    return user;
}

async function update(id, params) {
    const user = await User.findById(id);

    // validate
    if (!user) throw 'User not found';
    // if (user.username !== params.username && await User.findOne({ username: params.username })) {
    //     throw 'Username "' + params.username + '" is already taken';
    // }

    // hash password if it was entered
    if (params.password) {
        params.hash = bcrypt.hashSync(params.password, 10);
    }

    // copy params properties to user
    Object.assign(user, params);

    await user.save();
}


async function veryfyUser(token) {
    const verify_token = hashToken(token)

    //verify token
    const verifyToken = await tokenRepo.find(verify_token)
    if (!verifyToken) throw `Error: Invalid or expired token.`;

    //find user attributed to token
    const user = await User.findById(verifyToken.user)

    //update new verification status
    user.isVerified = true;
    await user.save()


    // Delete the used reset token
    await tokenRepo.delete(verifyToken._id);

    console.log('Updated user verification status:', user.isVerified);

    //log user verify email
    await logUserActivity(user._id, 'User Verify Account', { ip: headers().get('X-Forwarded-For'), email: user.email })

    return { success: true, message: "Success: Email verification successful." };

}

async function resendVerificationEmail(email) {
    // Check user
    const user = await User.findOne({ email });

    if (!user) throw `Error: User not found`;

    console.log('Updated user verification status:', user.isVerified);
    if (user.isVerified) throw `Error: User is verified`;

    const verifyToken = crypto.randomBytes(20).toString("hex");

    // Hash token
    const verifyTokenHash = hashToken(verifyToken)
    await tokenRepo.create(user._id, verifyTokenHash)

    //TODO: change this to use app's root url
    // const verifyBaseUrl = 'https://stomp-ai-app-zkwp.vercel.app/verify'

    const origin = headers().get("host")
    // const url = new URL(origin);

    const verifyBaseUrl = `http://${origin}/verify`
    const text = getEmailText('verify');
    const link = `${verifyBaseUrl}/${verifyToken}/${email}`
    const title = "Stomps Email Verification"
    const html = emailTemplate({ message: text, buttonLink: link, buttonText: "Verify Email Address" })

    // await sendGridSender({email, title, text, html})
    await elasticMailSender({ email, title, text, html })
    return {
        success: true,
        message: "Success: verification email sent.",
    };
}

async function googleAuth(token) {
    const googleUser = await GoogleVerifier(token);

    let user = await User.findOne({ $or: [{ googleId: googleUser.sub }, { email: googleUser.email }] });

    if (!user) {
        user = await User.create({ googleId: googleUser.sub, email: googleUser.email, isVerified: true });

        //log user register
        await logUserActivity(user._id, 'User Register', { ip: headers().get('X-Forwarded-For') })

        return 'Register Success';
    }

    if (!user.googleId || !user.isVerified) {
        user.googleId = googleUser.sub;
        user.isVerified = true;
        await user.save();
    }

    //log user login
    await logUserActivity(user._id, 'User Login', { ip: headers().get('X-Forwarded-For'), type: "Google OAuth" })
    return 'Login Success'
}

async function forgetPassword(email, questions) {
    const user = await User.findOne({ email });

    if (!user) throw `Error: User not found`

    const isValid = user.validateSecurityQuestions(questions);

    if (!isValid) throw `Error: Incorrect security questions or answers`

    const resetToken = crypto.randomBytes(20).toString("hex");

    // Hash token
    const resetTokenHash = hashToken(resetToken)
    await tokenRepo.create(user._id, resetTokenHash)

    return {
        success: true,
        message: "Success: Change Password.",
        token: resetToken,
    };
}

async function resetPassword(token, password, confirmPassword) {
    if (password != confirmPassword) throw `Error: Password and ComfrimPassword does not match.`

    const reset_token = hashToken(token)

    const resetToken = await tokenRepo.find(reset_token)
    if (!resetToken) throw `Error: invalid or expired token.`;
    //find user attributed to token
    const user = await User.findById(resetToken.user)

    //update new users password
    user.hash = bcrypt.hashSync(password, 10);
    await user.save()

    // Delete the used reset token
    await tokenRepo.delete(resetToken._id);

    //log user reset pass
    await logUserActivity(user._id, 'User Reset Password', { ip: headers().get('X-Forwarded-For') })

    return { success: true, message: "Success: Password updated, Please Login." };
}

async function _delete(id) {
    await User.findByIdAndRemove(id);
}

