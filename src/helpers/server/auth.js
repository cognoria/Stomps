import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
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
    const token = cookies().get('authorization')?.value ?? '';
    //TODO: JWT_Secret will be created randomly and saved for the user
    const decoded = jwt.verify(token, process.env.JWT_SECRET??'1234567890abcefjhijkl');
    // const decoded = jwt.verify(token, await globalRepo.getJwtSecret());
    const id = decoded.sub;
    return id;
}