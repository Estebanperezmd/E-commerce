class CartItem {
  constructor(idCarrito, idProducto, cantidad, idUsuario, confirmado = false) {
    this.idCarrito = idCarrito;
    this.idProducto = idProducto;
    this.cantidad = cantidad;
    this.idUsuario = idUsuario;
    this.confirmado = confirmado;
    this.validate();
  }

  validate() {
    if (!this.idCarrito) {
      throw new Error('El ID del carrito es requerido');
    }
    if (!this.idProducto) {
      throw new Error('El ID del producto es requerido');
    }
    if (!this.cantidad || this.cantidad < 1) {
      throw new Error('La cantidad debe ser mayor a 0');
    }
  }
}

module.exports = CartItem;