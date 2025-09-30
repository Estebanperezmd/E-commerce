import { Module } from '@nestjs/common';
import { PagosModule } from './pagos/pagos.module';

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


