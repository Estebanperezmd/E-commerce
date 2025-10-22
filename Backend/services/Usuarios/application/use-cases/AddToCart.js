const CartItem = require('../../domain/entities/CartItem');
const CartRepository = require('../../infrastructure/repositories/CartRepository');
const ProductRepository = require('../../../productos/infrastructure/repositories/ProductRepositoryImpl');

class AddToCart {
  constructor(
    cartRepository = new CartRepository(),
    productRepository = new ProductRepository()
  ) {
    this.cartRepository = cartRepository;
    this.productRepository = productRepository;
  }

  async execute({ id_carrito, id_producto, cantidad = 1, id_usuario = null }) {
    try {
      // Validaciones
      if (!id_producto) throw new Error('El ID del producto es requerido');
      if (cantidad < 1) throw new Error('La cantidad debe ser mayor a 0');
      
      // Verificar si el producto existe y tiene stock
      const product = await this.productRepository.findById(id_producto);
      if (!product) {
        throw new Error('Producto no encontrado');
      }
      if (product.stock < cantidad) {
        throw new Error('Stock insuficiente');
      }

      // Crear el item del carrito
      const cartItem = new CartItem(
        id_carrito,
        id_producto,
        cantidad,
        id_usuario
      );

      // Guardar en el carrito
      const result = await this.cartRepository.addToCart(cartItem);

      // Actualizar el stock del producto
      await this.productRepository.updateStock(id_producto, -cantidad);

      return result;
    } catch (error) {
      throw new Error(`Error al agregar al carrito: ${error.message}`);
    }
  }
}

module.exports = AddToCart;
