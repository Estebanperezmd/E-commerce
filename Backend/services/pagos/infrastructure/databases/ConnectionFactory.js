const { DataSource } = require('typeorm');
const databaseConfig  = require('./DatabaseConfig.js'); 


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


module.exports = { AppDataSource, initDatabase };
