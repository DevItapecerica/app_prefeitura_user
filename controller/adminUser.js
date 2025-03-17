const DBUser = require("../db/model/UserModel");
const bcrypt = require("bcryptjs");

// Função para criar um usuário
exports.create = async (userTarget) => {
  try {
    // Gera um hash seguro para a senha
    const hashedPassword = await bcrypt.hash(userTarget.name, 10);

    // Cria o usuário no banco de dados
    const newUser = await DBUser.create({
      name: userTarget.name,
      email: userTarget.email,
      ramal: userTarget.ramal,
      setor_id: userTarget.setor_id,
      password: hashedPassword,
      role: userTarget.role,
    });

    return newUser;
  } catch (error) {
    throw {
      message: "Erro ao criar usuário: " + error.message,
      status: error.status,
    };
  }
};

// Obtém um único usuário por ID
exports.getOne = async (paramId) => {
  try {
    const oneUser = await DBUser.findOne({
      where: { id: paramId },
      attributes: { exclude: ["password"] },
    });

    if (!oneUser) throw { message: "Erro ao encontrar usuário", status: 400 };

    return oneUser;
  } catch (error) {
    throw {
      message: error.message || "Erro ao encontrar usuário",
      status: error.status || 500,
    };
  }
};

// Obtém todos os usuários
exports.getAll = async () => {
  try {
    const allUsers = await DBUser.findAll({
      attributes: { exclude: ["password"] },
    });

    return allUsers;
  } catch (error) {
    throw {
      message: error.message || "Erro ao encontrar usuários",
      status: error.status || 400,
    };
  }
};

// Atualiza um usuário
exports.update = async (userTarget, paramId) => {
  try {
    // Atualiza o usuário
    await DBUser.update(
      {
        name: userTarget.name,
        email: userTarget.email,
        ramal: userTarget.ramal,
        setor_id: userTarget.setor_id,
        role: userTarget.role,
      },
      { where: { id: paramId } }
    );

    return "Usuário atualizado com sucesso";
  } catch (error) {
    throw new Error("Erro ao atualizar usuário: " + error.message);
  }
};

// Remove um usuário
exports.remove = async (paramId) => {
  try {
    const deleted = await DBUser.destroy({ where: { id: paramId } });

    if (!deleted) throw { message: "Usuário não encontrado", status: 404 };

    return deleted;
  } catch (error) {
    throw {
      message: error.message || "Erro ao deletar usuário",
      status: error.status || 400,
    };
  }
};

exports.removeBySector = async (sectorId) => {
  try {
    const deleted = await DBUser.destroy({ where: { id: paramId } });
    return deleted;
  } catch (error) {
    error = new Error("Erro ao deletar usuários do setor");
  }
};
exports.getLogin = async (email) => {
  const user = await DBUser.findOne({
    where: { email: email },
  });

  return user;
};
