class PaymentService {
  static async processPayment({ idPedido, metodo, monto }) {
    return {
      success: true,
      idPago: Math.floor(Math.random() * 1000000),
      idPedido,
      metodo,
      monto,
      fecha: new Date().toISOString()
    };
  }
}

module.exports = PaymentService;
