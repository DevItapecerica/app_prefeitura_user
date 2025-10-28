import { GenAndSendPass } from "../services/GenAndSendPass.js";
import { CreateUser, GetOneUser } from "../services/userManipulation.js";

export const cadastrarUser = async (request, reply) => {
  try {
    const { user } = request.body;
    const hashedPassword = await GenAndSendPass(user.email);

    const newUser = await CreateUser(user, hashedPassword);

    return reply.status(201).send({ user: newUser });
  } catch (error) {
    throw {
      code: error.code,
      message: error.message,
      ok: false,
      api: "User_MS",
      validation: error.validation,
    };
  }
};

export const getOneUser = async (request, reply) => {
  try {
    const { id } = request.params;
    const user = await GetOneUser(id);

    return reply.status(200).send({ user });
  } catch (error) {
    throw {
      code: error.code,
      message: error.message,
      ok: false,
      api: "User_MS",
      validation: error.validation,
    };
  }
};

export const getAllUser = async (request, reply) => {
  try {
    const users = await db.Users.findAll({
      attributes: { exclude: ["password"] },
    });

    return reply.status(200).send({ users });
  } catch (error) {
    throw {
      code: error.code,
      message: error.message,
      ok: false,
      api: "User_MS",
      validation: error.validation,
    };
  }
};

export const atualizarUser = async (request, reply) => {
  try {
    const { user } = request.body;
    const { id } = request.params;

    const target = await db.Users.findByPk(id);

    if (!target) {
      throw {
        code: 404,
        message: "Usuário nao encontrado",
        ok: false,
        api: "User_MS",
      };
    }

    Object.assign(target, {
      name: user.name,
      email: user.email,
      ramal: user.ramal,
      setor_id: user.setor_id,
      role_id: user.role_id,
    });

    await target.save();

    return reply.status(204).send();
  } catch (error) {
    throw {
      code: error.code,
      message: error.message,
      ok: false,
      api: "User_MS",
      validation: error.validation,
    };
  }
};

export const deletarUser = async (request, reply) => {
  const { id } = request.params;

  try {
    if (parseInt(id) <= 1) {
      throw {
        code: 401,
        message: "You cannot delete the default user.",
        ok: false,
        api: "User_MS",
      };
    }

    const deleted = await db.Users.destroy({ where: { id } });

    if (!deleted) {
      throw {
        code: 404,
        message: "Usuário nao encontrado",
        ok: false,
        api: "User_MS",
      };
    }

    return reply.status(204).send();
  } catch (error) {
    throw {
      code: error.code,
      message: error.message,
      ok: false,
      api: "User_MS",
      validation: error.validation,
    };
  }
};

export const deletarUserSetor = async (request, reply) => {
  try {
    const { id: setorId } = request.params;

    await db.Users.destroy({ where: { setor_id: setorId } });

    return reply.status(204).send();
  } catch (error) {
    throw {
      code: error.code,
      message: error.message,
      ok: false,
      api: "User_MS",
      validation: error.validation,
    };
  }
};
