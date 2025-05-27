const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "mail.itapecerica.sp.gov.br", // servidor de email
  port: 25,
  secure: false, // true para porta 465
  auth: {
    user: "miguel.moraes@itapecerica.sp.gov.br",
    pass: "Smile@614", // não é sua senha normal
  },
});

const sendMail = async (to, subject, text, html) => {
  try {
    const info = await transporter.sendMail({
      from: '"Tecnologia - Itapecerica da Serra" <miguel.moraes@itapecerica.sp.gov.br>',
      to,
      subject,
      text,
      html,
    });
    return info;
  } catch (error) {
    throw { statusCode: 404, message: "Erro ao enviar e-mail " + error };
  }
};

module.exports = {
  sendMail,
};
