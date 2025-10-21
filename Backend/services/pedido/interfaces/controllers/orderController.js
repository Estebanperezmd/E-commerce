const OrderService = require('../../application/services/orderService');
const OrderRepositoryImpl = require('../../infrastructure/repositories/OrderRepositoryImpl');

const repository = new OrderRepositoryImpl();
const orderService = new OrderService(repository);

class OrderController {
  static async create(req, res) {
    try {
      const { id_carrito } = req.body;
      const pedido = await orderService.createOrder(Number(id_carrito));
      res.status(201).json(pedido);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async findAll(req, res) {
    try {
      const pedidos = await orderService.listOrders();
      res.status(200).json(pedidos);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async findById(req, res) {
    try {
      const pedido = await orderService.getOrderById(Number(req.params.id));
      if (!pedido) return res.status(404).json({ message: 'Pedido no encontrado' });
      res.status(200).json(pedido);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
}

module.exports = OrderController;
