import { Pago } from '../../domain/entities/Pago.js';
import { PaymentService } from '../services/PaymentService.js';

export class ListPagos {
  constructor(paymentService) {
    this.paymentService = paymentService;
  }

  async execute() {
    return this.paymentService.findAllPagos();
  }
}
