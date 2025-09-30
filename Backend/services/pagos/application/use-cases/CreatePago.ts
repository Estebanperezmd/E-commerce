import { Pago } from '../../domain/entities/Pago';
import { PagoDTO } from '../../interfaces/dtos/PagoDTO';
import { PaymentService } from '../services/PaymentService';

export class CreatePago {
  constructor(private paymentService: PaymentService) {}

  async execute(dto: PagoDTO): Promise<Pago> {
    const pago = new Pago(null, dto.monto, dto.metodo);
    return this.paymentService.savePago(pago);
  }
}
