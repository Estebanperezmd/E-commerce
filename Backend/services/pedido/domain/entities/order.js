class Order {
  constructor(id, id_carrito, fecha, estado) {
    this.id = id;
    this.id_carrito = id_carrito;
    this.fecha = fecha;
    this.estado = estado;
  }
}

module.exports = Order;
