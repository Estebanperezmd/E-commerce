import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

// Importa todos tus módulos
import { PagosModule } from './pagos/pagos.module.js';
// Importa tus entidades
import { Pago } from './pagos/domain/entities/Pago.js';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '5432', 10),
      username: process.env.DB_USER || 'postgres',
      password: process.env.DB_PASSWORD || 'postgres',
      database: process.env.DB_NAME || 'ecommerce_db',
      entities: [Pago, Usuario, Carrito, Pedido, Producto],
      synchronize: true, //  Solo para desarrollo, no usar en producción
    }),

    // importa todos los módulos
    PagosModule
  ],
})
export class AppModule {}


