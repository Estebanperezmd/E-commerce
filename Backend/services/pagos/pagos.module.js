import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PagoController } from './interfaces/controllers/PagoController.js';
import { PaymentService } from './application/services/PaymentService.js';
import { Pago } from './domain/entities/Pago.js';

@Module({
  imports: [
    TypeOrmModule.forFeature([Pago]), // 👈 agrega la entidad Pago
  ],
  controllers: [PagoController],
  providers: [PaymentService],
  exports: [PaymentService],
})
export class PagosModule {}

