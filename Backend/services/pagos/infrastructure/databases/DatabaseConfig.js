const Pago = require('../../domain/entities/Pago');

 const databaseConfig = {
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432', 10),
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: process.env.DB_NAME || 'pagos_db',
  entities: [Pago],
  synchronize: true, // ⚠️ Solo para desarrollo
};


module.exports = databaseConfig;