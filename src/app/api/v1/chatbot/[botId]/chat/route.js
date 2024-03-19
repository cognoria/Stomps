//delete chatbot
import { chatbotRepo, chatRepo } from "../../../../../../helpers/server";
import { apiHandler } from "../../../../../../helpers/server/api";

module.exports = apiHandler({
  POST: chatCompletion,
});

async function chatCompletion(req) {
  const { botId } = req.params;
  const { messages } = req.body;
  return await chatRepo.getChatResponse(botId, messages);
}

