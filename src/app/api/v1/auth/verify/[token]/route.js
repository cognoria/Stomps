import { usersRepo } from "../../../../../../helpers/server";
import { apiHandler } from "../../../../../../helpers/server/api";

module.exports = apiHandler({
    routePattern: "/api/v1/auth/verify/:token", // Add this line
    GET: verify,
});

async function verify(req) {
    const { token } = req.params;
    throw 'Deprecated'
    // return await usersRepo.veryfyUser(token);
}

