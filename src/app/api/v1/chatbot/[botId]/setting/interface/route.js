//update chatbot name
import joi from "joi";
import { chatbotRepo } from "../../../../../../../helpers/server";
import { apiHandler } from "../../../../../../../helpers/server/api";

module.exports = apiHandler({
    POST: updateChatInterface,
});

//route POST api/v1/chatbot/[botId]/setting/interface
async function updateChatInterface(req) {
    const { botId } = req.params;
    const params = await req.json()
    return await chatbotRepo.updateChatInterface(botId, params);
}

updateChatInterface.schema = joi.object({
    initialMsg: joi.string().required(),
    suggestedMsgs: joi.array().items(joi.object({
        question: joi.string().required(),
    })).required(),
    msgPlaceholder: joi.string().required(),
    theme: joi.string().required(),
    displayName: joi.string().required(),
    chatIcon: joi.string().required(),
    alignChatButton: joi.string().required(),
    autoShowMsg: joi.number().required(),
    profileImage: joi.string().required()
});