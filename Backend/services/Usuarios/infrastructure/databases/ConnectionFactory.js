// infrastructure/databases/ConnectionFactory.js
const { DataSource } = require('typeorm');
const { databaseConfig } = require('./DatabaseConfig');

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

// 👉 Esta es la función que esperaba tu repositorio
const getConnection = async () => {
  await initDatabase();
  return AppDataSource; // DataSource tiene un método .query(sql, params?)
};

module.exports = { AppDataSource, initDatabase, getConnection };
