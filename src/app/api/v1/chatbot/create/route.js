//create chatbot
import joi from "joi";
import { apiHandler } from "../../../../../helpers/server/api";
import { chatbotRepo } from "../../../../../helpers/server/repos";

module.exports = apiHandler({
  POST: createChatbot,
});

async function createChatbot(req) {
  const body = await req.json();
  body.filePaths = req.files;
  return await chatbotRepo.create(body);
}

createChatbot.schema = joi.object({
  website: joi.string().uri({ scheme: ['http', 'https'] }).required(), //http website url
  name: joi.string().required(),
  urls: joi.array().items(joi.string().uri({ scheme: ['http', 'https'] })).required(), //array of string
  include: joi.array().items(joi.string().uri({ scheme: ['http', 'https'] })),  //array of string
  exclude: joi.array().items(joi.string().uri({ scheme: ['http', 'https'] })),  //array of string
  contents: joi.string()
});
