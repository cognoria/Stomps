import joi from 'joi'
import { globalRepo } from "../../../../../helpers/server";
import { apiHandler } from "../../../../../helpers/server/api";

module.exports = apiHandler({
    GET: isGlobalKeysSet,
    POST: setGlobalKeys,
});

//route GET api/v1/user/global
async function isGlobalKeysSet() {
    return await globalRepo.isKeys();
}

//route POST api/v1/user/global
async function setGlobalKeys(req) {
    const params = await req.json()
    console.log(params)
    return await globalRepo.setGlobalKeys(params);
}

setGlobalKeys.schema = joi.object({
    openaiKey: joi.string().required(),
    pineconeKey: joi.string().required(),
});