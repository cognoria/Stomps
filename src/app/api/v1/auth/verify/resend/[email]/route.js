import { usersRepo } from "../../../../../../../helpers/server";
import { apiHandler } from "../../../../../../../helpers/server/api";

module.exports = apiHandler({
    GET: verify,
});

async function verify(req) {
    const { email } = req.params;
    return await usersRepo.resendVerificationEmail(email);
}

