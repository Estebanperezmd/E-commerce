import { DataSource } from 'typeorm';
import { databaseConfig } from './DatabaseConfig';

export const AppDataSource = new DataSource(databaseConfig);

export const initDatabase = async () => {
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

