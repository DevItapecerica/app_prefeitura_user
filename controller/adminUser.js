const DBUser = require("../db/model/UserModel");


exports.removeBySetor = async (setorId) => {
  try {
    const deleted = await DBUser.destroy({ where: { setor_id: paramId } });
    return deleted;
  } catch (error) {
    error = new Error("Erro ao deletar usuários do setor");
  }
};