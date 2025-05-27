const { DBUser } = require("../models");

const CreateUser = async (user, password) => {
        const newUser = await DBUser.create({
      name: user.name,
      email: user.email,
      ramal: user.ramal,
      setor_id: user.setor_id,
      password: hashedPassword,
      role_id: user.role_id,
    });

    return newUser;
}

module.exports = {
  CreateUser,
};