import joi from "joi";
import { usersRepo } from "../../../../../helpers/server";
import { apiHandler } from "../../../../../helpers/server/api";

module.exports = apiHandler({
  POST: register,
});

async function register(req) {
  const body = await req.json();
  return await usersRepo.create(body);
}

register.schema = joi.object({
  email: joi.string().email().required(),
  password: joi.string().min(6).required(),
  question: joi.string().required(),
  answer: joi.string().required(),
});
