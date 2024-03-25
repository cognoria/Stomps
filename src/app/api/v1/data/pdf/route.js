import { apiHandler } from "../../../../../helpers/server/api";
// import pdf from 'pdf-parse';
import multer from 'multer';

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024, // Max file size of 10MB
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(new Error('Only PDF files are allowed'));
    }
  },
});

module.exports = apiHandler({
    POST: getPdfContents,
});

//route GET api/v1/data/pdf
async function getPdfContents(req, res) {
    await new Promise((resolve, reject) => {
        upload.single('pdf')(req, res, (err) => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        });
      });

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
