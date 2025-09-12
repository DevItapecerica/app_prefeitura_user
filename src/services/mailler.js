import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "mail.itapecerica.sp.gov.br",
  port: 25,
  secure: false,
  auth: {
    user: "miguel.moraes@itapecerica.sp.gov.br",
    pass: "Smile@614", // ⚠️ Considere mover para variável de ambiente
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
