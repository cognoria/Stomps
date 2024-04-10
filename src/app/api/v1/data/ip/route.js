import { headers } from "next/headers";
import { apiHandler } from "../../../../../helpers/server/api";

module.exports = apiHandler({
    GET: getIP,
});

//route GET api/v1/data/ip
async function getIP(req) {
    console.log(headers())
    const ip = headers().get('x-real-ip') || headers().get('X-Forwarded-For').split(',')[0] || req.ip || req.connection.remoteAddress
    return { ip }
}

