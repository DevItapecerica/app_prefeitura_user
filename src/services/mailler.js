import nodemailer from "nodemailer";
import { MAIL_ADRESS, MAIL_HOST, MAIL_PASSWORD } from "../config/env.js";

const transporter = nodemailer.createTransport({
  host: MAIL_HOST,
  port: 25,
  secure: false,
  auth: {
    user: MAIL_ADRESS,
    pass: MAIL_PASSWORD,
  },
});

export const sendMail = async (to, subject, text, html) => {
  try {
    await transporter.sendMail({
      from: '"Tecnologia - Itapecerica da Serra" <miguel.moraes@itapecerica.sp.gov.br>',
      to,
      subject,
      text,
      html,
    });
    return true;
  } catch (error) {
    console.error("Erro ao enviar e-mail:", error);
    throw {
      code: 500,
      message: "Erro ao enviar e-mail: " + error.message,
      ok: false,
      api: "User",
      validation: false,
    };
  }
};
