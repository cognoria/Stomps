//update chatbot model
import joi from "joi";
import { chatbotRepo } from "../../../../../../../helpers/server";
import { apiHandler } from "../../../../../../../helpers/server/api";
import { chatModelEnum } from "../../../../../../../helpers/enums";

module.exports = apiHandler({
    POST: updateModel,
});

async function updateModel(req) {
    const { botId } = req.params;
    const params = await req.json()
    return await chatbotRepo.updateName(botId, params);
}

updateModel.schema = joi.object({
    prompt: joi.string().required(),
    model: joi.string().valid(...Object.values(chatModelEnum)).required(),
    temparature: joi.number().min(0).max(1).required()
});