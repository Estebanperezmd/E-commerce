const { AppDataSource } = require('../../infrastructure/databases/ConnectionFactory');
const Order = require('../../domain/entities/Order');
const Cart = require('../../domain/entities/Cart');

class CreateOrder {
  static async execute({ id_carrito }) {
    try {
      const cartRepo = AppDataSource.getRepository(Cart);
      const orderRepo = AppDataSource.getRepository(Order);

      const cart = await cartRepo.findOne({ where: { id: id_carrito } });
      if (!cart) throw new Error(`Carrito ${id_carrito} no existe`);

      const newOrder = orderRepo.create({
        id_carrito,
        fecha: new Date(),
        estado: 'CREADO',
      });

      const savedOrder = await orderRepo.save(newOrder);

      return {
        id_pedido: savedOrder.id,
        fecha: savedOrder.fecha,
        estado: savedOrder.estado,
      };
    } catch (err) {
      console.error('Error creating order:', err);
      throw err;
    }
  }
}

module.exports = CreateOrder;
