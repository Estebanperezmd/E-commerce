import { Pago } from '../../domain/entities/Pago';
import { PaymentService } from '../services/PaymentService';

export class ListPagos {
  constructor(private paymentService: PaymentService) {}

  async execute(): Promise<Pago[]> {
    return this.paymentService.findAllPagos();
  }
}
