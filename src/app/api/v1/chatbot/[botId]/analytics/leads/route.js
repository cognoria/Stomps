//delete chatbot
import { chatRepo } from "../../../../../../../helpers/server";
import { apiHandler } from "../../../../../../../helpers/server/api";

module.exports = apiHandler({
  GET: chatbotLeads,
});

//route GET api/v1/chatbot/[botId]/analytics/leads
async function chatbotLeads(req) {
  const { botId } = req.params;
  
  return await chatRepo.getChatbotLeads(botId)
}

