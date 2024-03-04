import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

export const auth = {
    isAuthenticated,
    verifyToken
}

function isAuthenticated() {
    try {
        verifyToken();
        return true;
    } catch {
        return false;
    }
}

function verifyToken() {
    const token = cookies().get('authorization')?.value ?? '';
    //TODO: JWT_Secret will be created randomly and saved for the user
    const decoded = jwt.verify(token, '1234567890abcefjhijkl');
    const id = decoded.sub;
    return id;
}