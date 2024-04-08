//create chatbot
import joi from "joi";
import { apiHandler } from "../../../../../helpers/server/api";
import { chatbotRepo } from "../../../../../helpers/server/repos";

module.exports = apiHandler({
  POST: createChatbot,
});

//route POST api/v1/chatbot/create
async function createChatbot(req) {
  const body = await req.json();
  return await chatbotRepo.create(body);
}

createChatbot.schema = joi.object({
  website: joi.string().uri({ scheme: ['http', 'https'] }).allow('').optional(),
  name: joi.string(),
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
