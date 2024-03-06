import { apiHandler } from "../../../helpers/server/api";

module.exports = apiHandler({
    GET: ping,
});

async function ping(req) {
    return { message: "Pong" }
}
