class Payment {
  constructor(idPago, idPedido, metodo, monto, fecha) {
    this.idPago = idPago;
    this.metodo = metodo;
    this.idPedido = idPedido; 
    this.monto = monto;
    this.fecha = fecha;
  }
}

module.exports = Payment;