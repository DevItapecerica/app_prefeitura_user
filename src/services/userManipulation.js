import { NODE_ENV } from "../config/env.js";
import db from "../db/context.js";

export const CreateUser = async (user, password) => {
  if (NODE_ENV == "dev") {
    console.log("Creating user:", user);
    console.log("Password:", password);
  }

  const newUser = await db.Users.create({
    name: user.name,
    email: user.email,
    ramal: user.ramal,
    setor_id: user.setor_id,
    password,
    role_id: user.role_id,
  });

  return newUser;
};

export const GetOneUser = async (id) => {
  const user = await db.Users.findOne({
    where: { id },
  });

  return user;
};
