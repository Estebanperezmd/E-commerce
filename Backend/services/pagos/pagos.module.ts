import { Module } from '@nestjs/common';
import { PagoController } from './interfaces/controllers/PagoController';
import { PaymentService } from './application/services/PaymentService';

@Module({
  controllers: [PagoController],
  providers: [PaymentService],
  exports: [PaymentService],
})
export class PagosModule {}
