const { AppDataSource } = require('../../infrastructure/databases/ConnectionFactory');
const CartDetail = require('../../domain/entities/CartDetail');
const Cart = require('../../domain/entities/Cart');

class AddToCart {
  static async execute({ id_carrito, id_producto, cantidad = 1, id_usuario = null }) {
    try {
      const cartRepo = AppDataSource.getRepository(Cart);
      const detailRepo = AppDataSource.getRepository(CartDetail);

      const cart = await cartRepo.findOne({ where: { id: id_carrito } });
      if (!cart) throw new Error(`Carrito ${id_carrito} no existe`);

      const detail = detailRepo.create({
        cart,
        id_producto,
        cantidad,
        id_usuario,
        confirmado: false,
      });

      const saved = await detailRepo.save(detail);

      return {
        id_carrito: cart.id,
        id_producto: saved.id_producto,
        cantidad: saved.cantidad,
        id_usuario: saved.id_usuario,
        confirmado: saved.confirmado,
      };
    } catch (err) {
      console.error('Error in AddToCart:', err);
      throw err;
    }
  }
}

module.exports = AddToCart;
