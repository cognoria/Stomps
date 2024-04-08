//update chatbot name
import joi from "joi";
import { chatbotRepo } from "../../../../../../helpers/server";
import { apiHandler } from "../../../../../../helpers/server/api";

module.exports = apiHandler({
    POST: updateSource,
    GET: getSource,
});

//route POST api/v1/chatbot/[botId]/source
async function updateSource(req) {
    const { botId } = req.params;
    const params = await req.json()
    return await chatbotRepo.updateKnowledgebase(botId, params);
}

//route GET api/v1/chatbot/[botId]/source
async function getSource(req) {
    const { botId } = req.params;
    return await chatbotRepo.getChatbotSources(botId);
}

updateSource.schema = joi.object({
    urls: joi.array().required(), //array of string
    include: joi.array(),  //array of string
    exclude: joi.array(),  //array of string
    contents: joi.array(),
});

