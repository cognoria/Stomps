import joi from "joi";
import { usersRepo } from "../../../../../helpers/server";
import { apiHandler } from "../../../../../helpers/server/api";

module.exports = apiHandler({
  POST: google,
});

async function google(req) {
  const {token} = await req.json();
 return await usersRepo.googleAuth(token);
}

google.schema = joi.object({
  token: joi.string().min(6).required(),
});
