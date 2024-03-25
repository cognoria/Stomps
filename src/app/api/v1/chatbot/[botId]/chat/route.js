//delete chatbot
import joi from "joi";
import { chatbotRepo, chatRepo } from "../../../../../../helpers/server";
import { apiHandler } from "../../../../../../helpers/server/api";

module.exports = apiHandler({
  POST: chatCompletion,
});

//route POST api/v1/chatbot/[botId]/setting/model
async function chatCompletion(req) {
  const { botId } = req.params;
  const { messages } = await req.json()
  return await chatRepo.getChatResponse(messages, botId);
}

chatCompletion.schema =  joi.object({
  messages: joi.array().required(),
});

