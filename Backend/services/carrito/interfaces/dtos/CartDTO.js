

class CartDTO {
  constructor(row) {
    this.id = row.id;
    this.id_usuario = row.id_usuario;
    this.id_producto = row.id_producto;
    this.cantidad = row.cantidad;
    this.fecha_creacion = row.fecha_creacion;
    // Puedes agregar más campos si la tabla tiene más columnas
  }
}

module.exports = CartDTO;