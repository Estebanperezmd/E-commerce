import { Pago } from '../../domain/entities/Pago.js';
import { PagoDTO } from '../../interfaces/dtos/PagoDTO.js';
import { PaymentService } from '../services/PaymentService.js';

export class CreatePago {
  constructor(paymentService) {
    this.paymentService = paymentService;
  }

  async execute(dto) {
    const pago = new Pago(null, dto.monto, dto.metodo);
    return this.paymentService.savePago(pago);
  }
}

