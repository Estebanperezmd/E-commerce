import { Pago } from '../../domain/entities/Pago.js';
import { PaymentService } from '../services/PaymentService.js';

export class GetPago {
  constructor(paymentService) {
    this.paymentService = paymentService;
  }

  async execute(id) {
    return this.paymentService.findPagoById(id);
  }
}
