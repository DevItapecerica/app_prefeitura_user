import { Sequelize } from "sequelize";
import { DATABASE_URL } from "../config/env.js";

const sequelize = new Sequelize(DATABASE_URL);

sequelize
  .authenticate()
  .then(() => {
    console.log("✅ Conectado ao banco de dados");
  })
  .catch((err) => {
    console.error("❌ Falha na conexão com o banco de dados:", err);
  });

// Sincronizar modelos sem excluir tabelas existentes (opcional)
// sequelize.sync({ alter: true })
//   .then(() => {
//     console.log("🔄 Modelos sincronizados com sucesso!");
//   })
//   .catch((err) => {
//     console.error("⚠️ Erro ao sincronizar modelos:", err);
//   });

export default sequelize;
