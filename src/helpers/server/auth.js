import jwt from 'jsonwebtoken';
import { cookies, headers } from 'next/headers';
import { globalRepo } from './repos';
import { cp } from 'fs';

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
    const token = cookies().get('authorization')?.value || headers().get('Authorization');
    console.log(cookies().get('authorization')?.value)
    console.log(headers().get('Authorization'))
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const id = decoded.sub;
    return id;
}