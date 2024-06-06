import { usersRepo } from "../../../../../../helpers/server";
import { apiHandler } from "../../../../../../helpers/server/api";

module.exports = apiHandler({
    GET: resend,
});

async function resend(req) {
    const { email } = req.query;
    throw 'Deprecated'
    // return await usersRepo.resendVerificationEmail(email);
}

