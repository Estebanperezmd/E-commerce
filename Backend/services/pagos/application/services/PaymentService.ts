import { Pago } from '../../domain/entities/Pago.js';

// Simulación inicial (en producción conecta con DB vía repositorio)
export class PaymentService {
  constructor() {
    this.pagos = [];
    this.idCounter = 1;
  }

  async savePago(pago) {
    pago.id = this.idCounter++;
    pago.fechaPago = new Date();
    this.pagos.push(pago);
    return pago;
  }

  async findPagoById(id) {
    return this.pagos.find(p => p.id === id) || null;
  }

  async findAllPagos() {
    return this.pagos;
  }
}
