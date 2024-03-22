//update chatbot name
import joi from "joi";
import { chatbotRepo } from "../../../../../../../helpers/server";
import { apiHandler } from "../../../../../../../helpers/server/api";

module.exports = apiHandler({
  POST: updateName,
});

async function updateName(req) {
  const { botId } = req.params;
  const { name } = await req.json()
  return await chatbotRepo.updateName(botId, name);
}

updateName.schema = joi.object({
  name: joi.string().required(),
});