import { chatbotRepo } from "../../../../../helpers/server";
import { apiHandler } from "../../../../../helpers/server/api";

module.exports = apiHandler({
  GET: chatbot,
});

async function chatbot(req) {
  const { botId } = req.params;
  return await chatbotRepo.getById(botId);
}

