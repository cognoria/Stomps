import { chatbotRepo, chatRepo } from "../../../../../../helpers/server";
import { apiHandler } from "../../../../../../helpers/server/api";
import joi from 'joi'

module.exports = apiHandler({
    GET: saveLead,
});

//route POST api/v1/embed/[botId]/widget-style
async function getChatbotStyles(req) {
    const { botId } = req.params;
    return await chatbotRepo.saveLead(botId)
}


