//delete chatbot
import { chatRepo } from "../../../../../../../helpers/server";
import { apiHandler } from "../../../../../../../helpers/server/api";

module.exports = apiHandler({
  GET: chatbotChats,
});

//route GET api/v1/chatbot/[botId]/analytics/chats
async function chatbotChats(req) {
  const { botId } = req.params;
  
  return await chatRepo.getChatbotChats(botId)
}

