import joi from "joi";
import { usersRepo } from "../../../../../../../helpers/server";
import { apiHandler } from "../../../../../../../helpers/server/api";

module.exports = apiHandler({
    POST: resetPass,
});

async function resetPass(req) {
    const { token } = req.params;
    const { password, confirmPassword } = await req.json()
    return await usersRepo.resetPassword(token, password, confirmPassword);
}

resetPass.schema = joi.object({
    password: joi.string().min(6).required(),
    confirmPassword: joi.string().min(6).required(),
});
