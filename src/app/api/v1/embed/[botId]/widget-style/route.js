import { chatbotRepo } from "../../../../../../helpers/server";
import { apiHandler } from "../../../../../../helpers/server/api";

module.exports = apiHandler({
    GET: getChatbotStyles,
    OPTIONS
});

//route POST api/v1/embed/[botId]/widget-style
async function getChatbotStyles(req) {
    const { botId } = req.params;
    return await chatbotRepo.getChatbotInterface(botId)
}

async function OPTIONS(req) {
    return true
}
