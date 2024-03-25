//update chatbot name
import joi from "joi";
import { chatbotRepo } from "../../../../../../../helpers/server";
import { apiHandler } from "../../../../../../../helpers/server/api";

module.exports = apiHandler({
  POST: updateLeadInfo,
});

//route POST api/v1/chatbot/[botId]/setting/lead
async function updateLeadInfo(req) {
  const { botId } = req.params;
  const params = await req.json()
  return await chatbotRepo.updateName(botId, params);
}

updateLeadInfo.schema = joi.object({
  title: joi.string().required(),
  collectName: joi.boolean().required(),
  collectEmail: joi.boolean().required(),
  collectPhone: joi.boolean().required(),
});
