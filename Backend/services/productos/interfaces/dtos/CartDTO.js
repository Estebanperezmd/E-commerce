class CartDTO {
  constructor({ id, link_invitacion, estado, fecha_creacion, productos = [] }) {
    this.id = id;
    this.link_invitacion = link_invitacion;
    this.estado = estado;
    this.fecha_creacion = fecha_creacion;
    this.productos = productos;
  }
}

module.exports = CartDTO;
