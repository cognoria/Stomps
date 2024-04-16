import { chatbotRepo } from "../../../../../../helpers/server";
import { apiHandler } from "../../../../../../helpers/server/api";

module.exports = apiHandler({
    GET: getChatbotStyles,
    OPTIONS: async (req) => {
        return NextResponse.json({}, {
            status: 200,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET,POST,PUT,PATCH,DELETE,OPTIONS',
                'Access-Control-Allow-Headers': 'content-type',
            },
        });
    },
});

//route POST api/v1/embed/[botId]/widget-style
async function getChatbotStyles(req) {
    const { botId } = req.params;
    return await chatbotRepo.getChatbotInterface(botId)
}
