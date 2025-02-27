import joi from "joi";
import { cookies } from "next/headers";
import { usersRepo } from "../../../../../helpers/server";
import { apiHandler } from "../../../../../helpers/server/api";

// import { usersRepo } from '@/helpers/server';
// import { apiHandler } from '@/helpers/server/api';

module.exports = apiHandler({
  POST: login,
});

async function login(req) {
  const body = await req.json();
  const { user, token } = await usersRepo.authenticate(body);

  // return jwt token in http only cookie

  cookies().set("authorization", token, { httpOnly: true });

  return user;
}

login.schema = joi.object({
  email: joi.string().email().required(),
  password: joi.string().required(),
});
