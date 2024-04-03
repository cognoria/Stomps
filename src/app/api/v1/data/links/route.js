import { websiteRepo } from "../../../../../helpers/server";
import { apiHandler } from "../../../../../helpers/server/api";

module.exports = apiHandler({
  GET: getWebLinks,
});

//route GET api/v1/data/links
async function getWebLinks(req) {
  const { type, url } = req.query;
  // console.log(req.query)
  return await websiteRepo.getUrls(type, url);
}

