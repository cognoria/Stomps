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
    website: joi.string().uri({ scheme: ['http', 'https'] }).allow('').optional(),
    urls: joi.array().items(joi.string()),
    include: joi.array().items(joi.string()),
    exclude: joi.array().items(joi.string()),
    contents: joi.array().when('website', {
        is: '',
        then: joi.array().items(joi.object({
            url: joi.string().required(),
            content: joi.string().required()
        })).min(1).required(),
        //.error(new Error('You cannot create a chatbot without a knowledgebase.')),
        otherwise: joi.array().optional(),
    }),
}).or('website', 'contents');


