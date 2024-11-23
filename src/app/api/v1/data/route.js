import { apiHandler } from "../../../../helpers/server/api";
// import pdf from 'pdf-parse';

// module.exports = apiHandler({
//     POST: getPdfContents,
// });
module.exports = apiHandler({
    GET: getPdfContents,
});

//route GET api/v1/data/pdf
async function getPdfContents(req) {
    if (!req.file) {
        throw 'No PDF file uploaded';
    }
    const pdf = import.meta("pdf-parse")
    const pdfBuffer = req.file.buffer;
    const pdfData = await pdf(pdfBuffer);

    const pdfName = req.file.originalname;
    const pdfContent = pdfData.text;

    return { name: pdfName, content: pdfContent };
}

// import { websiteRepo } from "../../../../helpers/server";
// import { apiHandler } from "../../../../helpers/server/api";

// module.exports = apiHandler({
//   GET: getWebLinks,
// });

// //route GET api/v1/data/links
// async function getWebLinks(req) {
//   const { type, url } = req.query;
//   console.log(req.query)
//   return await websiteRepo.getUrls(type, url);
// }

