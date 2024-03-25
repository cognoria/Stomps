import { usersRepo } from "../../../../../helpers/server";
import { apiHandler } from "../../../../../helpers/server/api";

module.exports = apiHandler({
  GET: me,
});

//route GET api/v1/user/me
async function me() {
 return await usersRepo.getCurrent();
}

