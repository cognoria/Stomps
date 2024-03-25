import { websiteRepo } from "../../../../../helpers/server";
import { apiHandler } from "../../../../../helpers/server/api";
import pdf from 'pdf-parse';

module.exports = apiHandler({
    POST: getPdfContents,
});

//route GET api/v1/data/pdf
async function getPdfContents(req) {
    if (!req.file) {
        throw 'No PDF file uploaded';
    }

    const pdfBuffer = req.file.buffer;
    const pdfData = await pdf(pdfBuffer);

    const pdfName = req.file.originalname;
    const pdfContent = pdfData.text;

    return { name: pdfName, content: pdfContent };
}


