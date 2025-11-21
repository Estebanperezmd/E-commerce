const { DataSource } = require('typeorm');
const { databaseConfig } = require('./DatabaseConfig.js');

const AppDataSource = new DataSource(databaseConfig);

const initDatabase = async () => {
  try {
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
      console.log('📦 Database connected successfully');
    }
  } catch (error) {
    console.error('❌ Error connecting to database:', error);
    throw error;
  }
};

// 👇 NUEVO: helper para ejecutar consultas crudas
const query = async (sql, params = []) => {
  if (!AppDataSource.isInitialized) {
    await initDatabase();
  }
  return AppDataSource.query(sql, params);
};

module.exports = { AppDataSource, initDatabase, query };
