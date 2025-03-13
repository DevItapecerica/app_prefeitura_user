const User = require("../controller/adminUserController");
const auth = require("../middleware/authKey");

async function routes(fastify, options) {
  fastify.route({
    method: "GET",
    url: "/user",
    preHandler: auth,
    handler: User.getAllUser,
  });

  fastify.route({
    method: "GET",
    url: "/user/:id",
    preHandler: auth,
    handler: User.getUser,
  });

  fastify.route({
    method: "post",
    url: "/user",
    preHandler: auth,
    handler: User.cadastrarUser,
  });

  fastify.route({
    method: "post",
    url: "/user/login",
    preHandler: auth,
    handler: User.getUserToLogin,
  });

  fastify.route({
    method: "delete",
    url: "/user/delete/:id",
    preHandler: auth,
    handler: User.deletarUser,
  });
}

module.exports = routes;
