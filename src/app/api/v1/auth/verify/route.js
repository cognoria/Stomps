import { usersRepo } from "../../../../../helpers/server";
import { apiHandler } from "../../../../../helpers/server/api";

module.exports = apiHandler({
    GET: verify,
});

async function verify(req) {
    const { token } = req.query;
    
    throw 'Deprecated'
    // return await usersRepo.veryfyUser(token);
}

