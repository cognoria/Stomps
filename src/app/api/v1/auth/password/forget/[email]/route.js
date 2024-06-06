import { usersRepo } from "../../../../../../../helpers/server";
import { apiHandler } from "../../../../../../../helpers/server/api";
import joi from "joi";

module.exports = apiHandler({
    GET: forgetPass,
});

async function forgetPass(req) {
    const { email } = req.params;
    const {question, answer} = await req.json()

    return await usersRepo.forgetPassword(email, question, answer);
}

forgetPass.schema = joi.object({
    question: joi.string().required(),
    answer: joi.string().required(),
});