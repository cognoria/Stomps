import { apiHandler } from "../../../../../helpers/server/api";

module.exports = apiHandler({
    GET: getIP,
});

// http://ip-api.com/json/{userIp}
// {
//     "ip": "24.48.0.1",
//     "country": "Canada",
//     "countryCode": "CA",
//     "region": "QC",
//     "regionName": "Quebec",
//     "city": "Montreal",
//     "zip": "H1K",
//     "lat": 45.6085,
//     "lon": -73.5493,
//     "timezone": "America/Toronto",
//     "isp": "Le Groupe Videotron Ltee",
//     "org": "Videotron Ltee",
//     "as": "AS5769 Videotron Ltee"
//   }

//route GET api/v1/data/ip
async function getIP(req) {
    const ip = headers().get('x-real-ip') || headers().get('X-Forwarded-For').split(',')[0] || req.ip || req.connection.remoteAddress
    return { ip }
}

