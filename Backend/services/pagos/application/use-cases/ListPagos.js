class ListPagos {
  constructor(paymentService) {
    this.paymentService = paymentService;
  }

  async execute() {
    return await this.paymentService.findAllPagos();
  }
}

module.exports = ListPagos;
