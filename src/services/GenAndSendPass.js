const { sendMail } = require("./mailler");
const generateRandomPassword = require("../utils/generateRandomPassword");

const GenAndSendPass = async (mail) => {
  const password = await generateRandomPassword();
  const hashedPassword = await bcrypt.hash(password, 10);

  await sendMail(
    mail,
    "Usuário criado com sucesso",
    "Lembre-se de alterar sua senha!",
    "Sua senha temporária é: " +
      password +
      " <br/> <strong>Tenha em mente que ela é de sua responsabilidade, assim como qualquer movimentação usando seu usuário.</strong>"
  );
  return hashedPassword;
};

module.exports = { GenAndSendPass };
