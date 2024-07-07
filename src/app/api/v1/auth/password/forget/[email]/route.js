import { usersRepo } from "../../../../../../../helpers/server";
import { apiHandler } from "../../../../../../../helpers/server/api";
import joi from "joi";

module.exports = apiHandler({
    POST: forgetPass,
});

async function forgetPass(req) {
    const { email } = req.params;
    const { questions } = await req.json()

    return await usersRepo.forgetPassword(email, questions);
}

forgetPass.schema = joi.object({
    questions: joi.array().items(joi.object({
        question: joi.string().required(),
        answer: joi.string().required(),
    })).length(2).required(),
});