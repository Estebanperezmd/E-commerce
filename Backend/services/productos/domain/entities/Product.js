class Product {
  constructor(id, nombre, descripcion, precio, stock, categoria, fechaCreacion = new Date()) {
    this.id = id;
    this.nombre = nombre;
    this.descripcion = descripcion;
    this.precio = precio;
    this.stock = stock;
    this.categoria = categoria;
    this.fechaCreacion = fechaCreacion;
    this.validate();
  }

  validate() {
    if (!this.nombre || this.nombre.trim().length === 0) {
      throw new Error('El nombre del producto es requerido');
    }
    if (this.precio <= 0) {
      throw new Error('El precio debe ser mayor a 0');
    }
    if (this.stock < 0) {
      throw new Error('El stock no puede ser negativo');
    }
    if (!this.categoria || this.categoria.trim().length === 0) {
      throw new Error('La categoría es requerida');
    }
  }

  updateStock(quantity) {
    const newStock = this.stock + quantity;
    if (newStock < 0) {
      throw new Error('Stock insuficiente');
    }
    this.stock = newStock;
  }

  updatePrice(newPrice) {
    if (newPrice <= 0) {
      throw new Error('El precio debe ser mayor a 0');
    }
    this.precio = newPrice;
  }
}

module.exports = Product;
