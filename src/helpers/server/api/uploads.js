import fs from 'node:fs';
import { pipeline } from 'node:stream';
import { promisify } from 'node:util';

const pump = promisify(pipeline);
const path = require('path');

export async function Upload(fileObject, directoryPath, acceptedExtensions) {
    try {
        const fileInfo = await fileObject.formData();
        const uploadedFile = fileInfo.files[0];
        const fileExtension = path.extname(uploadedFile.name).toLowerCase().slice(1);

        if (!acceptedExtensions.includes(fileExtension)) {
            return `Invalid file extension. Accepted extensions are: ${acceptedExtensions.join(', ')}`;
        }

        const destinationDirectory = './' + directoryPath;
        try {
            await fs.promises.access(destinationDirectory, fs.constants.F_OK);
        } catch (error) {
            await fs.promises.mkdir(destinationDirectory, { recursive: true });
        }

        const timestamp = Date.now();
        const newFilePath = `./${directoryPath}/${timestamp}_${uploadedFile.name}`;

        await pump(uploadedFile.stream(), fs.createWriteStream(newFilePath));

        return newFilePath;
    } catch (error) {
        return error;
    }
}

export async function deleteFile(filePath) {
    try {
        await fs.promises.access(filePath, fs.constants.F_OK);
        await fs.promises.unlink(filePath);
        return true;
    } catch (error) {
        console.error('Error deleting ' + filePath + ':', error);
        return 'Error deleting ' + filePath + ': ' + error.message;
    }
}
