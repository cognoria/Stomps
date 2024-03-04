import { usersRepo } from "../../../../../../../helpers/server";
import { apiHandler } from "../../../../../../../helpers/server/api";

module.exports = apiHandler({
    GET: forgetPass,
});

async function forgetPass(req) {
    const { email } = req.params;
    return await usersRepo.forgetPassword(email);
}

