//get all user chatbot
import { chatbotRepo } from "../../../../helpers/server";
import { apiHandler } from "../../../../helpers/server/api";

module.exports = apiHandler({
  GET: chatbot,
});

async function chatbot() {
 return await chatbotRepo.getAllUserBot();
}

