import DBUser from "../db/model/UserModel.js";
import { GenAndSendPass } from "../services/GenAndSendPass.js";
import { CreateUser, GetOneUser } from "../services/userManipulation.js";

export const cadastrarUser = async (request, reply) => {
  try {
    const { user } = request.body;
    const hashedPassword = await GenAndSendPass(user.email);

    const newUser = await CreateUser(user, hashedPassword);
    console.log(newUser);

    return reply.status(201).send({ user: newUser });
  } catch (error) {
    throw error;
  }
};

export const getOneUser = async (request, reply) => {
  try {
    const { id } = request.params;
    const user = await GetOneUser(id);

    return reply.status(200).send({ user });
  } catch (error) {
    throw error;
  }
};

export const getAllUser = async (request, reply) => {
  try {
    const users = await DBUser.findAll({
      attributes: { exclude: ["password"] },
    });

    return reply.status(200).send({ users });
  } catch (error) {
    return reply
      .status(error.status || 500)
      .send(error.message || "Erro interno do servidor");
  }
};

export const atualizarUser = async (request, reply) => {
  try {
    const { user } = request.body;
    const { id } = request.params;

    const target = await DBUser.findByPk(id);

    if (!target) {
      return reply.status(404).send({ error: "Usuário não encontrado" });
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
    throw error;
  }
};

export const deletarUser = async (request, reply) => {
  const { id } = request.params;

  try {
    if (parseInt(id) <= 1) {
      return reply
        .status(403)
        .send({ error: "Não é possível deletar esse usuário" });
    }

    const deleted = await DBUser.destroy({ where: { id } });

    if (!deleted) {
      return reply
        .status(400)
        .send({ error: "Não foi possível deletar o usuário" });
    }

    return reply.status(204).send();
  } catch (error) {
    throw error;
  }
};

export const deletarUserSetor = async (request, reply) => {
  try {
    const { id: setorId } = request.params;

    await DBUser.destroy({ where: { setor_id: setorId } });

    return reply.status(204).send();
  } catch (error) {
    throw error;
  }
};
