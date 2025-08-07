export const errorHook = (error, reply) => {
  const statusCode = error.status || error.statusCode || 500;
  const messageError =
    error.response?.data?.message || error.message || "Erro desconhecido";

  const payload = {
    statusCode,
    error: getErrorLabel(statusCode),
    message: `${getErrorLabel(statusCode)} ${messageError}`,
  };

  reply.status(statusCode).send(payload);
};

// função auxiliar para nomear o tipo de erro
function getErrorLabel(code) {
  switch (code) {
    case 400:
      return "Bad Request";
    case 401:
      return "Unauthorized";
    case 403:
      return "Forbidden";
    case 404:
      return "Not Found";
    case 500:
      return "Internal Server Error";
    default:
      return "Bad Request";
  }
}
