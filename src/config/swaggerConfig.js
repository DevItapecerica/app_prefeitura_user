export const swaggerConfig = (port) => ({
  openapi: {
    openapi: "3.0.0",
    components: {
      securitySchemes: {
        APIKey: {
          type: "apiKey",
          in: "header",
          name: "x-api-key",
          description: "Use a chave de API no cabeçalho como 'x-api-key'",
        },
      },
    },
    info: {
      title: "User Microservice API",
      description: "API principal para controle de usuários",
      version: "2.0.0",
    },
    servers: [
      {
        url: `http://189.20.193.253:${port}`,
        description: "Development server",
      },
      {
        url: `http://189.20.193.252:${port}`,
        description: "Production server",
      },
    ],
  },
});

export const swaggerUiConfig = {
  routePrefix: "/docs",
  exposeRoute: true,
};
