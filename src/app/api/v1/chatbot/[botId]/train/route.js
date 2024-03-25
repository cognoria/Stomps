//train chatbot
import { apiHandler } from "../../../../../../helpers/server/api";
import { chatbotRepo } from "../../../../../../helpers/server/repos";

module.exports = apiHandler({
  GET: trainChatbot,
});
//route GET api/v1/chatbot/[botId]/train
async function trainChatbot(req) {
  const { botId } = req.params;
  return await chatbotRepo.trainChatbot(botId);
}

