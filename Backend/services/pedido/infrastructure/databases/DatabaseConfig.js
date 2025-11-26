// pedido/infrastructure/databases/DatabaseConfig.js
require('dotenv').config();

console.log("DB CONFIG PEDIDO", {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD ? process.env.DB_PASSWORD.slice(0, 4) + "***" : undefined,
  name: process.env.DB_NAME,
});

const databaseConfig = {
  type: "postgres",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: false,       // Para no romper la DB
  logging: false,           // Si quieres logs SQL ponlo en true
};

module.exports = { databaseConfig };
