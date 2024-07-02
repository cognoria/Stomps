import { apiHandler } from "../../../../../helpers/server/api";
import { Upload } from "../../../../../helpers/server/api/uploads";
import { loadPDF } from "../../../../../utils/extractDoc/extractPdf";

module.exports = apiHandler({
    POST: getPdfContents,
});

//route GET api/v1/data/pdf
async function getPdfContents(req) {
    
    const arrayBuffer = await req.pdf.arrayBuffer();
        
    // Convert the ArrayBuffer to Buffer
    const BufferPDF = Buffer.from(arrayBuffer);
    const fresult = await loadPDF(BufferPDF);
    const pageText = fresult.map((item) => item.pageContent).join(' ')
    
   return { content: pageText, status: "Done"}
}
