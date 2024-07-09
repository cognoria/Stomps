import jwt from 'jsonwebtoken';
import { cookies, headers } from 'next/headers';

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
    const token = cookies().get('authorization')?.value || headers().get('authorization').split(' ')[1] || headers().get('auth-token');
    console.log(headers())
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const id = decoded.sub;
    return id;
}