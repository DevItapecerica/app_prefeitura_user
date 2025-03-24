const {
  getAll,
  getOne,
  update,
  remove,
} = require("./adminUser");

const DBUser = require("../db/model/UserModel");


// Permissões disponíveis
const roles = ["admin", "tecnico", "gestor", "user"];

exports.cadastrarUser = async (request, reply) => {
  try {
    let target = request.body;

    if (!roles.includes(target.role)) {
      return reply.status(400).send("Opção não disponível");
    }
    
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

    return reply.status(201).send("Cadastro realizado com sucesso");
  } catch (error) {
    throw error
  }
};

exports.getUser = async (request, reply) => {
  try {
    const user = await getOne(request.params.id); //get all of specify user, include password and is used to auth routes
    reply.status(200).send({user});
  } catch (error) {
    throw error
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
    // await verifyEmail(target.email);

    if (!roles.includes(target.role)) {
      return reply.status(403).send("Opção não disponível");
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

  try {
    if (id <= 1) {
      const error = new Error("Não é possível deletar esse usuário");
      error.status = 403;
      throw error;
    }

    await remove(id);

    return reply.status(200).send("Usuário deletado com sucesso");
  } catch (error) {
    throw error

  }
};

exports.deletarUserSetor = async (request, reply) => {
  try {
    let setorId = request.params.id 
    await removeBySetor(setorId)
    reply.status(200).send('Usúários excluidos com sucesso')
  } catch (error) {
    throw error;
  }

}
