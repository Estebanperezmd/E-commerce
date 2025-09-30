import { DataSourceOptions } from 'typeorm';
import { Pago } from '../../domain/entities/Pago';

export const databaseConfig: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432', 10),
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: process.env.DB_NAME || 'pagos_db',
  entities: [Pago],
  synchronize: true, // ⚠️ solo para desarrollo
};

