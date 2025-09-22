import { sendMail } from "./mailler.js";
import bcrypt from "bcryptjs";
import { generateRandomPassword } from "../utils/generateRandomPassword.js";

export const GenAndSendPass = async (mail) => {
  const password = await generateRandomPassword();
  const hashedPassword = await bcrypt.hash(password, 10);

  await sendMail(
    mail,
    "Usuário criado com sucesso",
    "Lembre-se de alterar sua senha!",
    `Sua senha temporária é:<br/> <b>${password}</b> <br/><b>Tenha em mente que ela é de sua responsabilidade, assim como qualquer movimentação usando seu usuário.</b>`
  );

  return hashedPassword;
};
