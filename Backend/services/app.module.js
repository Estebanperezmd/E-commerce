import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

// Importa todos tus módulos
import { PagosModule } from './pagos/pagos.module.js';
import { UsuariosModule } from './usuarios/usuarios.module.js';
import { CarritoModule } from './carrito/carrito.module.js';
import { PedidoModule } from './pedido/pedido.module.js';
import { ProductosModule } from './productos/productos.module.js';

// Importa tus entidades
import { Pago } from './pagos/domain/entities/Pago.js';
import { Usuario } from './usuarios/domain/entities/Usuario.js';
import { Carrito } from './carrito/domain/entities/Carrito.js';
import { Pedido } from './pedido/domain/entities/Pedido.js';
import { Producto } from './productos/domain/entities/Producto.js';

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
      synchronize: true, // ⚠️ Solo para desarrollo, no usar en producción
    }),

    // importa todos los módulos
    PagosModule,
    UsuariosModule,
    CarritoModule,
    PedidoModule,
    ProductosModule,
  ],
})
export class AppModule {}


