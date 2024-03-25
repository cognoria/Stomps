//update chatbot name
import joi from "joi";
import { chatbotRepo } from "../../../../../../../helpers/server";
import { apiHandler } from "../../../../../../../helpers/server/api";

module.exports = apiHandler({
    POST: updateSecurityData,
});

//route POST api/v1/chatbot/[botId]/setting/security
async function updateSecurityData(req) {
    const { botId } = req.params;
    const params = await req.json()
    return await chatbotRepo.updateSecurityData(botId, params);
}

updateSecurityData.schema = joi.object({
    visibility: joi.string().valid('PRIVATE', 'PUBLIC').required(), 
    allowPublicDomains: joi.boolean().required(),
    rateLimit: joi.object({
        limitMsg: joi.string().required(),
        msgCount: joi.number().integer().min(0).required(),
        timeframe: joi.number().integer().min(0).required()
    }).required()
});
