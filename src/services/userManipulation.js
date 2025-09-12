import { NODE_ENV } from "../config/env.js";

import DBUser from "../db/model/UserModel.js";

export const CreateUser = async (user, password) => {
  if (NODE_ENV == "development") {
    console.log("Creating user:", user);
    console.log("Password:", password);
  }

  const newUser = await DBUser.create({
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
  console.log("Getting user with ID:", id);

  const user = await DBUser.findOne({
    where: { id },
  });

  return user;
};
