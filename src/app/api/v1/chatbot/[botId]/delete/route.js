//delete chatbot
import { chatbotRepo } from "../../../../../../helpers/server";
import { apiHandler } from "../../../../../../helpers/server/api";

module.exports = apiHandler({
  DELETE: deleteBot,
});
//route DELETE api/v1/chatbot/[botId]/delete
async function deleteBot(req) {
  const { botId } = req.params;
  return await chatbotRepo.delete(botId);
}

