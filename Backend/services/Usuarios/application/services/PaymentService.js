const IPaymentService = require('../../domain/interfaces/IPaymentService');
const Payment = require('../../domain/entities/Payment');

class PaymentService extends IPaymentService {
  static async processPayment({ idPedido, metodo, monto }) {
    const payment = new Payment(
      Math.floor(Math.random() * 1000000),
      idPedido,
      metodo, 
      monto,
      new Date().toISOString()
    );

    return {
      success: true,
      ...payment
    };
  }
}

module.exports = PaymentService;