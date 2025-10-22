class GetPago {
  constructor(paymentService) {
    this.paymentService = paymentService;
  }

  async execute(id) {
    return await this.paymentService.findPagoById(id);
  }
}

module.exports = GetPago;
