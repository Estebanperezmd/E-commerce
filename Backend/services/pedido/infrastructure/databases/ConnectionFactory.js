// pedido/infrastructure/databases/ConnectionFactory.js
const { DataSource } = require("typeorm");
const { databaseConfig } = require("./DatabaseConfig");

const AppDataSource = new DataSource(databaseConfig);

const initDatabase = async () => {
  try {
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
      console.log("📦 PEDIDO Database connected successfully");
    }
  } catch (err) {
    console.error("❌ Error connecting to PEDIDO database:", err);
    throw err;
  }
};

const query = async (sql, params = []) => {
  if (!AppDataSource.isInitialized) {
    await initDatabase();
  }

  return AppDataSource.query(sql, params);
};

module.exports = { AppDataSource, initDatabase, query };
