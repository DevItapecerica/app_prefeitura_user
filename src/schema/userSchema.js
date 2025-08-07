import errorSchema from "./errorSchema.js";

export const getUserSchema = {
  description: "Pegue todos os usuários",
  tags: ["Users"],
  security: [{ APIKey: [] }],
  response: {
    200: {
      description: "Requisição bem sucedida",
      type: "object",
      properties: {
        users: {
          type: "array",
          items: {
            type: "object",
            properties: {
              id: { type: "integer", example: 1 },
              name: { type: "string", example: "kadoia" },
              email: { type: "string", example: "email@dominio.com.br" },
              ramal: { type: "string", example: "1234" },
              setor_id: { type: "integer", example: 1 },
              role_id: { type: "integer", example: 1 },
              firstLogin: { type: "boolean", example: true },
            },
          },
        },
        roles: {
          type: "array",
        },
      },
    },
    ...errorSchema,
  },
};

export const postUserSchema = {
  description: "Cria um novo usuário",
  tags: ["Users"],
  security: [{ APIKey: [] }],
  body: {
    type: "object",
    required: ["user"],
    properties: {
      user: {
        type: "object",
        required: ["name", "email", "ramal", "setor_id", "role_id"],
        properties: {
          name: { type: "string" },
          email: { type: "string" },
          ramal: { type: "string" },
          setor_id: { type: "integer" },
          role_id: { type: "integer" },
        },
      },
    },
  },
  response: {
    200: {
      description: "Usuário criado com sucesso",
      type: "object",
      properties: {
        user: {
          type: "object",
          properties: {
            name: { type: "string", example: "kadoia" },
            email: { type: "string", example: "kadoia@gmail.com" },
            ramal: { type: "string", example: "1234" },
            setor_id: { type: "integer", example: 1 },
            role_id: { type: "integer", example: 1 },
          },
        },
      },
    },
    ...errorSchema,
  },
};

export const getOneUserSchema = {
  description: "Retorna um usuário específico",
  tags: ["Users"],
  security: [{ APIKey: [] }],
  response: {
    200: {
      description: "Requisição bem sucedida",
      type: "object",
      properties: {
        user: {
          type: "object",
          properties: {
            id: { type: "integer", example: 1 },
            name: { type: "string", example: "kadoia" },
            email: { type: "string", example: "email@dominio.com.br" },
            ramal: { type: "string", example: "1234" },
            setor_id: { type: "integer", example: 1 },
            role_id: { type: "integer", example: 1 },
            password: { type: "string", example: "sua senha aqui" },
            firstLogin: { type: "boolean", example: true },
          },
        },
      },
    },
    ...errorSchema,
  },
};

export const updateUserSchema = {
  description: "Atualiza um usuário existente",
  tags: ["Users"],
  security: [{ APIKey: [] }],
  body: {
    type: "object",
    required: ["user"],
    properties: {
      user: {
        type: "object",
        required: ["name", "email", "ramal", "setor_id", "role_id"],
        properties: {
          name: { type: "string" },
          email: { type: "string" },
          ramal: { type: "string" },
          setor_id: { type: "integer" },
          role_id: { type: "integer" },
        },
      },
    },
  },
  response: {
    200: {
      description: "Usuário atualizado com sucesso",
      type: "object",
      properties: {
        message: { type: "string", example: "Usuário salvo com sucesso" },
      },
    },
    ...errorSchema,
  },
};

export const deleteUserSchema = {
  description: "Deleta um usuário",
  tags: ["Users"],
  security: [{ APIKey: [] }],
  response: {
    200: {
      description: "Usuário deletado com sucesso",
      type: "object",
      properties: {
        message: { type: "string", example: "Usuário deletado com sucesso" },
      },
    },
    ...errorSchema,
  },
};
