//delete chatbot
import { chatRepo } from "../../../../../../helpers/server";
import { apiHandler } from "../../../../../../helpers/server/api";

module.exports = apiHandler({
  GET: analytics,
});

//route GET api/v1/chatbot/[botId]/analytics
async function analytics(req) {
  const { botId } = req.params;
  const chatsPerDay = await chatRepo.getChatsPerDay(botId)
  const chatsPerCountry = await chatRepo.getChatsPerCountry(botId)
  return {chatsPerDay, chatsPerCountry}
}

