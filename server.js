const fastify = require("fastify");
const cors = require("@fastify/cors");

const swagger = require("@fastify/swagger");
const swaggerUi = require("@fastify/swagger-ui");

const routes = require('./router/routes')

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

app.register(routes)

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
