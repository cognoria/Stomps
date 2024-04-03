import { NextRequest } from 'next/server';

import { auth } from '../';

export { jwtMiddleware };

async function jwtMiddleware(req) {
    if (isPublicPath(req)) return;

    // verify token in request cookie
    const id = await auth.verifyToken();
    req.headers.set('userId', id);
}

function isPublicPath(req) {
    const normalizedPath = normalizePath(req);
    // public routes that don't require authentication
    const publicPaths = [
        'GET:/api/ping',
        'POST:/api/v1/auth/login',
        'POST:/api/v1/auth/logout',
        'POST:/api/v1/auth/google',
        'POST:/api/v1/auth/register',
        'GET:/api/v1/auth/verify/:token',
        'GET:/api/v1/auth/verify/resend/:email',
        'POST:/api/v1/auth/password/reset/:token',
        'GET:/api/v1/auth/password/forget/:email',
        // 'GET:/api/v1/data/links'
    ];
    
    const isPublic = publicPaths.some(path => matchPath(normalizedPath, path));
    return isPublic;
}

function normalizePath(req) {
    return `${req.method.toUpperCase()}:${req.nextUrl.pathname}`;
}

function matchPath(requestPath, definedPath) {
    const regex = definedPath.replace(/:[^\s/]+/g, '([\\w-.@]+)');
    return new RegExp(`^${regex}$`).test(requestPath);
}