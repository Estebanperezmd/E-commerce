const Pago = require('../../domain/entities/Pago');

class CreatePago {
  constructor(paymentService) {
    this.paymentService = paymentService;
  }

  async execute(pagoData) {
    const pago = new Pago(null, pagoData.monto, pagoData.metodo);
    return await this.paymentService.savePago(pago);
  }
}

module.exports = CreatePago;
