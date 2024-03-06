import formidable from 'formidable';
import fs from 'fs';
import path from 'path';

export async function uploadMiddleware(req) {
    // Use formidable to parse form data
    const form = new formidable.IncomingForm();
    form.uploadDir = "./public/uploads"; // Ensure this directory exists
    form.keepExtensions = true;

    const { fields, files } = await new Promise((resolve, reject) => {
        form.parse(req.body, (err, fields, files) => {
            if (err) reject(err);
            resolve({ fields, files });
        });
    });

    // Process the uploaded files
    req.files = [];
    Object.values(files).forEach((file) => {
        const newPath = path.join(form.uploadDir, file.originalFilename);
        fs.renameSync(file.filepath, newPath); // Move the file to the new path
        req.files.push(newPath);
    });

    // Attach the fields to req.body for subsequent middleware
    req.body = fields;
}