const DBUser = require("../db/model/UserModel");
const { GenAndSendPass } = require("../services/GenAndSendPass");
const { CreateUser, GetOneUser } = require("../services/userManipulation");

exports.cadastrarUser = async (request, reply) => {
  try {
    let user = request.body.user;

    const hashedPassword = await GenAndSendPass(user.email)

    // Cria o usuário no banco de dados
    const newUser = await CreateUser(user, hashedPassword);

    console.log(newUser)
    return reply.status(201).send({ user: newUser });
  } catch (error) {
    throw error;
  }
};

exports.getOneUser = async (request, reply) => {
  try {
    let id = request.params.id;

    const user = await GetOneUser(id) //get all of specify user, include password and is used to auth routes;

    reply.status(200).send({ user });
  } catch (error) {
    throw error;
  }
};

exports.getAllUser = async (request, reply) => {
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

exports.atualizarUser = async (request, reply) => {
  try {
    let user = request.body.user;
    let id = request.params.id;
    // await verifyEmail(target.email);

    const target = await DBUser.findByPk(id)

    target.name = user.name;
    target.email = user.email;
    target.ramal = user.ramal;
    target.setor_id = user.setor_id;
    target.role_id = user.role_id;

    await target.save()

    // await DBUser.update(
    //   {
    //     name: user.name,
    //     email: user.email,
    //     ramal: user.ramal,
    //     setor_id: user.setor_id,
    //     role_id: user.role_id,
    //   },
    //   { where: { id: id } }
    // );

    return reply.status(204).send();
  } catch (error) {
    throw error;
  }
};

exports.deletarUser = async (request, reply) => {
  let id = request.params.id;

  try {
    if (id <= 1) {
      const error = new Error("Não é possível deletar esse usuário");
      error.status = 403;
      throw error;
    }

    const deleted = await DBUser.destroy({ where: { id: id } });

    if (!deleted) {
      let error = new Error("Não foi possível deletar o usuário");
      error.status = 400;
      throw error;
    }

    return reply.status(204).send();
  } catch (error) {
    throw error;
  }
};

exports.deletarUserSetor = async (request, reply) => {
  try {
    let setorId = request.params.id;

    await DBUser.destroy({ where: { setor_id: setorId } });

    return reply.status(204);
  } catch (error) {
    throw error;
  }
};
