// infrastructure/databases/DatabaseConfig.js
require('dotenv').config(); 

const { Usuario } = require('../../domain/entities/Usuario.js');

console.log('DB CONFIG Usuario', {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD ? process.env.DB_PASSWORD.slice(0, 4) + '***' : undefined,
  name: process.env.DB_NAME,
});

const databaseConfig = {
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 5432,
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: process.env.DB_NAME || 'ecommerce',
  entities: [Usuario],
  synchronize: true,
};

module.exports = { databaseConfig };
