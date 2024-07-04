import jwt from 'jsonwebtoken';
import { cookies, headers } from 'next/headers';
import { globalRepo } from './repos';

export const auth = {
    isAuthenticated,
    verifyToken
}

async function isAuthenticated() {
    try {
        await verifyToken();
        return true;
    } catch {
        return false;
    }
}

async function verifyToken() {
    const token = cookies().get('authorization')?.value || headers().get('authorization').split(" ")[1];
    console.log({token})
    //TODO: JWT_Secret will be created randomly and saved for the user
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // const decoded = jwt.verify(token, await globalRepo.getJwtSecret());
    const id = decoded.sub;
    return id;
}