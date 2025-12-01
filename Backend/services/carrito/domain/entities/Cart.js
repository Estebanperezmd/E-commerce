class Cart {
  constructor(
    id_carrito,
    status = "open",
    fecha_creacion = new Date(),
    invitation_link = null,
    id_main_user = null
  ) {
    this.id_carrito = id_carrito;
    this.status = status;
    this.fecha_creacion = fecha_creacion;
    this.invitation_link = invitation_link;
    this.id_main_user = id_main_user;
  }
}

module.exports = Cart;
