//delete chatbot
import { chatbotRepo } from "../../../../../../helpers/server";
import { apiHandler } from "../../../../../../helpers/server/api";

module.exports = apiHandler({
  DELETE: deleteBot,
});

async function deleteBot(req) {
  const { botId } = req.params;
  return await chatbotRepo.delete(botId);
}

