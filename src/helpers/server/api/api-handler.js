import { NextRequest, NextResponse } from 'next/server';
import nextCors from 'next-cors';
import { errorHandler, jwtMiddleware, validateMiddleware } from './';
import { Upload } from './uploads';

export { apiHandler };

function apiHandler(handler) {
    // console.log
    const wrappedHandler = {};
    const httpMethods = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'];

    // wrap handler methods to add middleware and global error handler
    httpMethods.forEach(method => {
        if (typeof handler[method] !== 'function')
            return;

        wrappedHandler[method] = async (req, ...args) => {

            //Extract url params
            if (args.length > 0 && args[0].hasOwnProperty('params')) {
                req.params = args[0].params; // Assign the params object to req.params
            }

            // Extract searchParams from the request URL
            req.query = Object.fromEntries(req.nextUrl.searchParams);

            try {
                //check if file upload
                if (!req.headers.get('content-type')?.startsWith('multipart/form-data')) {

                    // monkey patch req.json() because it can only be called once
                    const json = await req.json();
                    req.json = () => Promise.resolve(json);
                }
            } catch { /* Ignore JSON parsing errors */ }

            try {
                if (req.headers.get('content-type')?.startsWith('multipart/form-data')) {
                    const upload = await Upload(req, "files", ['pdf'])
                    req.fileDir = upload
                }
            } catch (e) {
                console.log(e)
                throw 'error uploading doc: ' + e
            }

            try {
                // Handle OPTIONS requests
                if (req.method.toUpperCase() === 'OPTIONS') {
                    return NextResponse.json({});
                }

                // global middleware
                await jwtMiddleware(req);

                //validate form inputs
                await validateMiddleware(req, handler[method].schema);

                // route handler
                const responseBody = await handler[method](req, ...args);
                return NextResponse.json(responseBody ?? {})
            } catch (err) {
                // global error handler
                return errorHandler(err);
            }
        };
    });

    return wrappedHandler;
}