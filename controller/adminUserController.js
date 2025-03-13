const {
  getAll,
  getOne,
  create,
  update,
  remove,
  getLogin,
} = require("./adminUser");
const { verifyEmail } = require("../utils/verifyEmail");

// Permissões disponíveis
const roles = ["admin", "tecnico", "gestor", "user"];

exports.cadastrarUser = async (request, reply) => {
  try {
    let target = request.body;

    if (!roles.includes(target.role)) {
      return reply.status(400).send("Opção não disponível");
    }

    await create(target);

    return reply.status(201).send("Cadastro realizado com sucesso");
  } catch (error) {
    return reply
      .status(error.status || 500)
      .send(error.message || "Erro interno do servidor");
  }
};

exports.getUser = async (request, reply) => {
  try {
    const user = await getOne(request.params.id); //get all of specify user, include password and is used to auth routes
    reply.status(200).send({user});
  } catch (error) {
    console.log(JSON.stringify(error));
    reply
      .status(error.status || 500)
      .send(error.message || "Erro interno do servidor");
  }
};

exports.getAllUser = async (request, reply) => {
  try {
    const data = await getAll();

    return reply
      .status(200)
      .send({ users: data, roles: roles });
  } catch (error) {
    return reply
      .status(error.status || 500)
      .send(error.message || "Erro interno do servidor");
  }
};

exports.atualizarUser = async (request, reply) => {
  try {
    let target = request.body.user;
    await verifyEmail(target.email);

    if (!roles.includes(target.role)) {
      return reply.status(400).send("Opção não disponível");
    }

    await update(target, request.params.id);
    return reply.status(200).send("Atualização bem-sucedida");
  } catch (error) {
    return reply
      .status(error.status || 500)
      .send(error.message || "Problemas ao atualizar usuário");
  }
};

exports.deletarUser = async (request, reply) => {
  let id = request.params.id;
  console.log("teste");
  try {
    if (id == 1) {
      return reply.status(403).send("Não é possível deletar esse usuário");
    }

    await remove(id);

    return reply.status(200).send("Usuário deletado com sucesso");
  } catch (error) {
    return reply
      .status(error.status || 500)
      .send(error.message || "Problemas no servidor...");
  }
};

exports.getUserToLogin = async (request, reply) => {
  const { email } = request.body;

  try {
    const user = await getLogin(email);

    if (!user) {
      throw { message: "Usuário não encontrado", status: 401 };
    }

    reply.status(200).send(user);
  } catch (error) {
    reply
      .status(error.status || 500)
      .send(error.message || "Erro interno do servidor");
  }
};
