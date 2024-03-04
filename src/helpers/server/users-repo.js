import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import crypto from "crypto"
import { headers } from 'next/headers';
import { db } from './db';
import { hashToken } from '../cryptography';
import { emailTemplate, getEmailText } from './email/emailTemplate';
import { logUserActivity } from './log-repo';
import { GoogleVerifier } from './oauth.Google';
import elasticMailSender from './email/elasticSender';

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
    resendVerificationEmail,
};

async function authenticate({ email, password }) {
    const user = await User.findOne({ email });

    if (!(user && await bcrypt.compareSync(password, user.hash))) {
        throw 'Username or password is incorrect';
    }

    // create a jwt token that is valid for 7 days
    //TODO: JWT_Secret will be created randomly and saved for the user
    const token = jwt.sign({ sub: user.id }, '1234567890abcefjhijkl', { expiresIn: '7d' });

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

async function create(params, req) {
    // validate
    if (await User.findOne({ email: params.email })) {
        throw 'User "' + params.email + '"  already exist';
    }

    const user = new User(params);

    // hash password
    if (params.password) {
        user.hash = bcrypt.hashSync(params.password, 10);
    }

    // save user
    await user.save();

    //send email verification
    const verifyToken = crypto.randomBytes(20).toString("hex");

    // Hash token
    const verifyTokenHash = hashToken(verifyToken)
    await Token.create({ user: user.id, token: verifyTokenHash })
    const verifyBaseUrl = 'https://stomp-ai-app-zkwp.vercel.app/verify'
    // ///TODO: send verifyToken to user email email
    const text = getEmailText('verify');
    const link = `${verifyBaseUrl}/${verifyToken}?email=${params.email}`
    const title = "Stomps Email Verification"
    const html = emailTemplate({ message: text, buttonLink: link, buttonText: "Verify Email Address" })

    // await sendGridSender({email, title, text, html})
    await elasticMailSender({ email: params.email, title, text, html })

    //log user register
    // await logUserActivity(user.id, 'User Register', { ip: req.ip })
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

async function veryfyUser(token){
    const verify_token = hashToken(token)

    //verify token
    const verifyToken = await Token.findOne({ token: verify_token })
    if (!verifyToken) throw `Error: Invalid or expired token.`;

    //find user attributed to token
    const user = await User.findById(verifyToken.user)

    //update new verification status
    user.isVerified = true;
    await user.save()

    // Delete the used reset token
    await verifyToken.remove();

    //log user verify email
    await logUserActivity(user._id, 'User Verify Account', { ip: req.ip, email: user.email })

    return { success: true, message: "Success: Email verification successful." };

}

async function resendVerificationEmail(email){
    // Check user
    const user = await User.findOne({ email });

    if (!user)  throw `Error: User not found`;

    if (!user.isVerified) return `Error: User is verified`;

    const verifyToken = crypto.randomBytes(20).toString("hex");

    // Hash token
    const verifyTokenHash = hashToken(verifyToken)
    await Token.create({ user: user._id, token: verifyTokenHash })
    
    const verifyBaseUrl = 'https://stomp-ai-app-zkwp.vercel.app/verify'
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

async function googleAuth(token){
    const googleUser = await GoogleVerifier(token);

    let user = await User.findOne({ $or: [{ googleId: googleUser.sub }, { email: googleUser.email }] });

    if (!user) {
        user = await User.create({ googleId: googleUser.sub, email: googleUser.email, isVerified: true });

        //log user register
        await logUserActivity(user._id, 'User Register', { ip: req.ip })

        return 'Register Success';
    }

    if (!user.googleId || !user.isVerified) {
        user.googleId = googleUser.sub;
        user.isVerified = true;
        await user.save();
    }

    //log user login
    await logUserActivity(user._id, 'User Login', { ip: req.ip, type: "Google OAuth" })
    return 'Login Success'
}

async function forgetPassword(email){
    const user = await User.findOne({ email });

    if (!user) `Error: User not found`

    const resetToken = crypto.randomBytes(20).toString("hex");

    // Hash token
    const resetTokenHash = hashToken(resetToken)
    await Token.create({ user: user._id, token: resetTokenHash })
    
    const resetBaseUrl = 'https://stomp-ai-app-zkwp.vercel.app/reset/'
    const text = getEmailText('reset');
    const link = `${resetBaseUrl}/${resetToken}`
    const title = "[Action Required]: Reset Password."
    const html = emailTemplate({ message: text, buttonLink: link, buttonText: "Reset Password" })

    // await sendGridSender({email, title, text, html})
    await elasticMailSender({ email, title, text, html })

    return {
        success: true,
        message: "Success: reset email sent.",
    };
}

async function resetPassword(token, password, confirmPassword){
    if (password != confirmPassword) throw `Error: Password and ComfrimPassword does not match.`

    const reset_token = hashToken(token)

    const resetToken = await Token.findOne({ token: reset_token })
    if (!resetToken) throw `Error: invalid or expired token.`;
    //find user attributed to token
    const user = await User.findById(resetToken.user)

    //update new users password
    user.hash = bcrypt.hashSync(password, 10);;
    await user.save()

    // Delete the used reset token
    await resetToken.remove();
    
    //log user reset pass
    await logUserActivity(user._id, 'User Reset Password', { ip: req.ip })


    return { success: true, message: "Success: Password updated, Please Login." };

}

async function _delete(id) {
    await User.findByIdAndRemove(id);
}

