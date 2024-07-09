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
    const token = cookies().get('authorization')?.value || headers().get('authorization');
    console.log({token})
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log({decoded})
    const id = decoded.sub;
    return id;
}