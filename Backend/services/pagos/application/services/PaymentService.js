const Pago = require('../../domain/entities/Pago');


// Simulación inicial (en producción conecta con DB vía repositorio)
 class PaymentService {
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
 module.exports = PaymentService;