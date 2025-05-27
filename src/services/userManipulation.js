const DBUser = require("../db/model/UserModel");

const CreateUser = async (user, password) => {
  console.log("Creating user:", user);
  console.log("Creating pass:", password);
  const newUser = await DBUser.create({
    name: user.name,
    email: user.email,
    ramal: user.ramal,
    setor_id: user.setor_id,
    password: password,
    role_id: user.role_id,
  });

  return newUser;
};

const GetOneUser = async (id) => {
  console.log("Getting user with ID:", id);
  const user = await DBUser.findOne({
    where: { id: id },
  });
  
  return user;
}


module.exports = {
  CreateUser,
  GetOneUser
};
