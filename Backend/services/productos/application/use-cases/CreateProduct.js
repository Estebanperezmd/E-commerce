const Product = require('../../domain/entities/Product');
const ProductRepository = require('../../infrastructure/repositories/ProductRepositoryImpl');

class CreateProduct {
  constructor(productRepository = new ProductRepository()) {
    this.productRepository = productRepository;
  }

  async execute({ nombre, descripcion, precio, stock, categoria }) {
    try {
      // Validar datos de entrada
      if (!nombre) throw new Error('El nombre es requerido');
      if (!descripcion) throw new Error('La descripción es requerida');
      if (!precio || precio <= 0) throw new Error('El precio debe ser mayor a 0');
      if (!categoria) throw new Error('La categoría es requerida');
      if (stock < 0) throw new Error('El stock no puede ser negativo');

      // Crear instancia de producto
      const product = new Product(
        null,
        nombre,
        descripcion,
        precio,
        stock || 0,
        categoria
      );

      // Guardar en el repositorio
      const createdProduct = await this.productRepository.create(product);
      
      return createdProduct;
    } catch (error) {
      throw new Error(`Error al crear producto: ${error.message}`);
    }
  }
}

module.exports = CreateProduct;
