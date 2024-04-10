import { chatRepo } from "../../../../../../helpers/server";
import { apiHandler } from "../../../../../../helpers/server/api";
import joi from 'joi'

module.exports = apiHandler({
    POST: saveLead,
});

//route POST api/v1/embed/[botId]/lead
async function saveLead(req) {
    const { botId } = req.params;
    const params = await req.json()
    return await chatRepo.saveLead(botId, params)
}

saveLead.schema = joi.object({
    name: joi.string().optional(),
    email: joi.string().required(),
    phone: joi.string().optional(),
});

