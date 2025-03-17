const fastify = require("fastify");
const cors = require("@fastify/cors");

const swagger = require("@fastify/swagger");
const swaggerUi = require("@fastify/swagger-ui");

const routes = require("./router/routes");

const app = fastify();

app.register(cors, {
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["content-type", "authorization"],
  credentials: true,
});

app.register(swagger, {
  swagger: {
    info: {
      title: "Fastify API",
      description: "API de gerenciamento de usuários e login",
      version: "1.0.0",
    },
    servers: [
      {
        url: "http://192.168.16.80:8002",
        description: "Development server",
      },
    ],
  },
});

app.register(swaggerUi, {
  routePrefix: "/docs",
  exposeRoute: true,
});

// Usando o hook onError para tratamento global de erros
app.setErrorHandler((error, request, reply) => {
  app.log.error(error); // Log do erro para debugar

  const statusCode = error.status || 500;
  let messageError =
    error.response?.data.message || error.message || "Erro desconhecido";
  // Verifica o tipo de erro e responde com o status adequado
  switch (statusCode) {
    case 400:
      reply.status(statusCode).send({
        statusCode: statusCode,
        error: "Server Error",
        message: "Bad Request " + messageError,
      });
      break;
    case 401:
      reply.status(statusCode).send({
        statusCode: statusCode,
        error: "Server Error",
        message: "Unauthorized " + messageError,
      });
      break;
    case 403:
      reply.status(statusCode).send({
        statusCode: statusCode,
        error: "Server Error",
        message: "Forbidden " + messageError,
      });
      break;
    case 404:
      reply.status(statusCode).send({
        statusCode: statusCode,
        error: "Server Error",
        message: "Not found " + messageError,
      });
      break;
    case 500:
      reply.status(statusCode).send({
        statusCode: statusCode,
        error: "Server Error",
        message: "Internal server error " + messageError,
      });
      break;
    default:
      reply.status(statusCode).send({
        statusCode: statusCode,
        error: "Server Error",
        message: "Internal server error " + messageError,
      });
  }
});

app.register(routes);

const port = 8002;

const start = () => {
  try {
    app.listen({ port, host: "0.0.0.0" });
    console.log(`🚀 Aplicação rodando na porta ${port}`);
  } catch (error) {
    console.log(error);
  }
};

start();
