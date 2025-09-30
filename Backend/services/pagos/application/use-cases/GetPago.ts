import { Pago } from '../../domain/entities/Pago';
import { PaymentService } from '../services/PaymentService';

export class GetPago {
  constructor(private paymentService: PaymentService) {}

  async execute(id: number): Promise<Pago | null> {
    return this.paymentService.findPagoById(id);
  }
}
