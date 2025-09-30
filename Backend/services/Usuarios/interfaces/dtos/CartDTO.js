class CartDTO {
  constructor({ id, productos, total }) {
    this.id = id;
    this.productos = productos;
    this.total = total;
  }
}

module.exports = CartDTO;
