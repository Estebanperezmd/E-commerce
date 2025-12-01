require("dotenv").config();
const Cart = require("../../domain/entities/Cart.js");

const databaseConfig = {
  type: "postgres",
  host: process.env.DB_HOST || "hopper.proxy.rlwy.net",
  port: Number(process.env.DB_PORT || 22340),
  username: process.env.DB_USER || "postgres",
  password: process.env.DB_PASSWORD || "MTZZMkPnvJCbpPMdAcVNXLtwddTHlXMo",
  database: process.env.DB_NAME || "railway",
  entities: [Cart],
  synchronize: false, 
};

module.exports = databaseConfig;
