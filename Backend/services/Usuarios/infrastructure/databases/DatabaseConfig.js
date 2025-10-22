// infrastructure/databases/DatabaseConfig.js
const { Usuario } = require('../../domain/entities/User'); // ajusta al nombre real de tu entidad

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
