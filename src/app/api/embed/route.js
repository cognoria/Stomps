// import { readFileSync } from 'fs';
// import { join } from 'path';

const { apiHandler } = require("../../../helpers/server/api");

module.exports = apiHandler({
    GET
});

async function GET(req, res) {
    const filePath = join(process.cwd(), '/embed.js');
    const fileContent = readFileSync(filePath, 'utf8');
    res.setHeader('Content-Type', 'application/javascript');
    res.send(fileContent);
}