// import multer from 'multer';

// const upload = multer({
//     storage: multer.memoryStorage(),
//     limits: {
//         fileSize: 5 * 1024 * 1024, // Max file size of 10MB
//     },
//     fileFilter: (req, file, cb) => {
//         if (file.mimetype === 'application/pdf') {
//             cb(null, true);
//         } else {
//             cb(new Error('Only PDF files are allowed'));
//         }
//     },
// });


export async function uploadMiddleware(req, res) {
    // console.log(req)
    await new Promise((resolve, reject) => {
        upload.single('pdf')(req, res, (err) => {
            if (err) {
                console.log(err)
                reject(err);
            } else {
                resolve();
            }
        });
    });

}