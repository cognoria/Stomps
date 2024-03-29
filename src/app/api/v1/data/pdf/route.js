import { apiHandler } from "../../../../../helpers/server/api";
import { Upload } from "../../../../../helpers/server/api/uploads";

module.exports = apiHandler({
    POST: getPdfContents,
});

//route GET api/v1/data/pdf
async function getPdfContents(req) {
    const  upload = await Upload(req,"files",['pdf'])
    console.log(upload)
   return {status: "Done"}
}
