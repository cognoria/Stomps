import { usersRepo } from "../../../../../helpers/server";
import { apiHandler } from "../../../../../helpers/server/api";

module.exports = apiHandler({
  GET: me,
});

async function me() {
 return await usersRepo.getCurrent();
}

