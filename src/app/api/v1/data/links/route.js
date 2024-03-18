import { websiteRepo } from "../../../../../helpers/server";
import { apiHandler } from "../../../../../helpers/server/api";

module.exports = apiHandler({
  GET: getWebLinks,
});

async function getWebLinks(req) {
  const { type, url } = req.query;
  return await websiteRepo.getUrls(type, url);
}

