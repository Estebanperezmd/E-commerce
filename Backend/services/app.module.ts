import { Module } from '@nestjs/common';
import { PagosModule } from './pagos/pagos.module';
// Importa también otros módulos como Usuarios, Carrito, Pedido, etc.

@Module({
  imports: [
    PagosModule,
    UsuariosModule,
    CarritoModule,
    PedidoModule,
    ProductosModule
  ],
})
export class AppModule {}

