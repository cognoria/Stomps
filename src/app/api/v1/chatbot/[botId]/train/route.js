//train chatbot
import { apiHandler } from "../../../../../../helpers/server/api";
import { chatbotRepo } from "../../../../../../helpers/server/repos";

module.exports = apiHandler({
  GET: trainChatbot,
});

async function trainChatbot(req) {
    const { botId } = req.params;
  return await chatbotRepo.trainChatbot(botId);
}

