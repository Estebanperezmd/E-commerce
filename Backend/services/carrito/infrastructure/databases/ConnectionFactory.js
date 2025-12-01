// infrastructure/databases/ConnectionFactory.js
const { DataSource } = require("typeorm");
const databaseConfig = require("./DatabaseConfig");

const AppDataSource = new DataSource(databaseConfig);

const initDatabase = async () => {
  try {
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
      console.log("📦 [CARRITO] DB connected successfully");
    }
  } catch (error) {
    console.error("❌ [CARRITO] Error connecting to database:", error);
    throw error;
  }
};

module.exports = { AppDataSource, initDatabase };
