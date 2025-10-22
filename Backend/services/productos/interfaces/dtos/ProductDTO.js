class ProductDTO {
  static toDTO(product) {
    if (!product) return null;

    return {
      id: product.id,
      nombre: product.nombre,
      descripcion: product.descripcion,
      precio: product.precio,
      stock: product.stock,
      categoria: product.categoria,
      fechaCreacion: product.fechaCreacion,
      disponible: product.stock > 0
    };
  }

  static fromDTO(dto) {
    if (!dto) throw new Error('Datos del producto requeridos');

    if (!dto.nombre || dto.nombre.trim().length === 0) {
      throw new Error('El nombre del producto es requerido');
    }
    if (!dto.precio || dto.precio <= 0) {
      throw new Error('El precio debe ser mayor a 0');
    }
    if (dto.stock < 0) {
      throw new Error('El stock no puede ser negativo');
    }
    if (!dto.categoria || dto.categoria.trim().length === 0) {
      throw new Error('La categoría es requerida');
    }

    return {
      nombre: dto.nombre.trim(),
      descripcion: dto.descripcion ? dto.descripcion.trim() : '',
      precio: parseFloat(dto.precio),
      stock: parseInt(dto.stock || 0),
      categoria: dto.categoria.trim()
    };
  }

  static toListDTO(products) {
    if (!Array.isArray(products)) return [];
    return products.map(product => this.toDTO(product));
  }

  static toDetailDTO(product) {
    if (!product) return null;
    
    return {
      ...this.toDTO(product),
      valorInventario: product.precio * product.stock,
      fechaCreacionFormatted: product.fechaCreacion.toLocaleDateString()
    };
  }
}

module.exports = ProductDTO;