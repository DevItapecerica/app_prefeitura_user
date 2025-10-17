import path from "path";
import dotenv from "dotenv";
import { fileURLToPath } from "url";

// __dirname equivalente em ES Module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// carregar variáveis do .env
dotenv.config({ path: path.resolve(__dirname, "../../.env") });

function must(name) {
  const val = process.env[name];
  if (!val) throw new Error(`Env ${name} is missing`);
  return val;
}

// exportar variáveis
export const NODE_ENV = must("NODE_ENV");
export const DATABASE_URL = must("DATABASE_URL");

export const API_KEY = must("API_KEY");

export const PORT = must("APPLICATION_PORT");

export const MAIL_ADRESS = must("MAIL_ADRESS");
export const MAIL_PASSWORD = must("MAIL_PASSWORD");
export const MAIL_HOST = must("MAIL_HOST");
