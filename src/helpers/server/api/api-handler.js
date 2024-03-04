import { NextRequest, NextResponse } from 'next/server';

import { errorHandler, jwtMiddleware, validateMiddleware } from './';

export { apiHandler };

function apiHandler(handler) {
    // console.log(handler)
    const wrappedHandler = {};
    const httpMethods = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'];

    // wrap handler methods to add middleware and global error handler
    httpMethods.forEach(method => {
        if (typeof handler[method] !== 'function')
            return;

        wrappedHandler[method] = async (req, ...args) => {
                        
            if (args.length > 0 && args[0].hasOwnProperty('params')) {
                req.params = args[0].params; // Assign the params object to req.params
            }
            
            // Extract searchParams from the request URL
            req.searchParams = Object.fromEntries(req.nextUrl.searchParams);

            try {
                // monkey patch req.json() because it can only be called once
                const json = await req.json();
                req.json = () => json;
                const query = req.query;
                req.query = query
             } catch { }

            try {
                // global middleware
                await jwtMiddleware(req);
                await validateMiddleware(req, handler[method].schema);

                // route handler
                const responseBody = await handler[method](req, ...args);
                return NextResponse.json(responseBody || {});
            } catch (err) {
                // global error handler
                return errorHandler(err);
            }
        };
    });

    return wrappedHandler;
}