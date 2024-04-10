import { chatRepo } from "../../../../../../helpers/server";
import { apiHandler } from "../../../../../../helpers/server/api";
import joi from 'joi'

module.exports = apiHandler({
    POST: chatResponse,
});

//route POST api/v1/embed/[botId]/chat
async function chatResponse(req) {
    const { botId } = req.params;
    const params = await req.json()
    return await chatRepo.widgetChatResponse(botId, params)
}

chatResponse.schema = joi.object({
    message: joi.string().required(),
    userData: joi.object().optional(),
});

