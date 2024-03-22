import joi from 'joi'
import { globalRepo } from "../../../../../helpers/server";
import { apiHandler } from "../../../../../helpers/server/api";

module.exports = apiHandler({
    GET: isGlobalKeysSet,
    POST: setGlobalKeys,
});

async function isGlobalKeysSet() {
    return await globalRepo.isKeys();
}

async function setGlobalKeys(req) {
    const params = req.json()
    return await globalRepo.setGlobalKeys(params);
}

setGlobalKeys.schema = joi.object({
    openaiKey: joi.string().email().required(),
    pineconeKey: joi.string().required(),
  });