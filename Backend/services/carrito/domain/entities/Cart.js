class Cart {
  constructor(id, fecha_creacion, estado = 'open', link_invitacion = null, productos = []) {
    this.id = id;                     
    this.fecha_creacion = fecha_creacion; 
    this.estado = estado;              
    this.link_invitacion = link_invitacion; 
    this.productos = productos;        
  }
}

module.exports = Cart;
