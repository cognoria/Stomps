import formidable from 'formidable';
import fs from 'fs';
import path from 'path';

export async function uploadMiddleware(req) {
    // Use formidable to parse form data
    const form = new formidable({
        uploadDir: "./public/uploads", // Ensure this directory exists
        keepExtensions: true,
        allowEmptyFiles: false, // Don't allow empty files
        maxFileSize: 1024 * 1024 * 10, // Max file size of 10MB
        filter: part => ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'].includes(part.mimetype),
    });


    const { fields, files } = await new Promise((resolve, reject) => {
        form.parse(req, (err, fields, files) => {
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
    req.fields = fields;
}