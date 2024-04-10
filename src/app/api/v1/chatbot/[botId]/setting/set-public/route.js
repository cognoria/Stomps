//update chatbot name
import joi from "joi";
import { chatbotRepo } from "../../../../../../../helpers/server";
import { apiHandler } from "../../../../../../../helpers/server/api";

module.exports = apiHandler({
  GET: setPublic,
});
//route POST api/v1/chatbot/[botId]/setting/set-public
async function setPublic(req) {
  const { botId } = req.params;
  return await chatbotRepo.setPublic(botId);
}
