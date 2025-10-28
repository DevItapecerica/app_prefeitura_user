import { NODE_ENV, PORT } from "./config/env.js";

const port = PORT || 8002;

// fastify
import Fastify from "fastify";
import cors from "@fastify/cors";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";

// swagger
import { swaggerConfig, swaggerUiConfig } from "./config/swaggerConfig.js";
import { corsConfig } from "./config/corsConfig.js";

// hooks
import LoggerResponse from "./hooks/LoggerResponse.js";
import errorHook from "./hooks/errorHook.js";

// router
import userRouter from "./router/userRouter.js";

//outros
import db from "./db/models/index.js";
import logConfig from "./config/logConfig.js";

const fastify = Fastify(logConfig);

// plugins
// await fastify.register(loggerPlugin);
await fastify.register(cors, corsConfig);
await fastify.register(fastifySwagger, swaggerConfig(port));
await fastify.register(fastifySwaggerUi, swaggerUiConfig);

// hooks
await fastify.register(errorHook);
await fastify.register(LoggerResponse);

// rotas
await fastify.register(userRouter);

// inicialização
const start = async () => {
  try {
    await fastify.listen({ port, host: "0.0.0.0" });
    NODE_ENV === "development" ? await db.sequelize.authenticate() : "";
    console.log(`Server is running on port ${PORT}`);
  } catch (error) {
    console.error("❌ Erro ao iniciar o servidor:", error);
    process.exit(1);
  }
};

start();
