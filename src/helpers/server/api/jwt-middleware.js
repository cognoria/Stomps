import { NextRequest } from 'next/server';

import { auth } from '../';

export { jwtMiddleware };

async function jwtMiddleware(req) {
    if (isPublicPath(req))
        return;

    // verify token in request cookie
    const id = auth.verifyToken();
    req.headers.set('userId', id);
}

function isPublicPath(req) {
    // public routes that don't require authentication
    const publicPaths = [
        'POST:/api/v1/auth/login',
        'POST:/api/v1/auth/logout',
        'POST:/api/v1/auth/register',
        'POST:/api/v1/auth/google'
    ];
    return publicPaths.includes(`${req.method}:${req.nextUrl.pathname}`);
}