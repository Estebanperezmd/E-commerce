const AddToCart = require('../../application/use-cases/AddToCart');
const CreateOrder = require('../../application/use-cases/CreateOrder');
const ConnectionFactory = require('../../infrastructure/databases/ConnectionFactory');
const CartDTO = require('../dtos/CartDTO');

class CartController {
  static async addProduct(req, res) {
    try {
      const { id_carrito } = req.params;
      const { id_producto, cantidad, id_usuario } = req.body;
      const result = await AddToCart.execute({
        id_carrito: Number(id_carrito),
        id_producto,
        cantidad,
        id_usuario
      });
      res.status(200).json(result);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async createOrder(req, res) {
    try {
      const { id_carrito } = req.params;
      const pedido = await CreateOrder.execute({ id_carrito: Number(id_carrito) });
      res.status(201).json(pedido);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async getCart(req, res) {
    try {
      const { id_carrito } = req.params;
      const q = `SELECT * FROM carrito WHERE id = $1`;
      const r = await ConnectionFactory.query(q, [id_carrito]);
      if (r.rows.length === 0) return res.status(404).json({ message: 'Carrito no encontrado' });
      const detalles = await ConnectionFactory.query('SELECT * FROM detalle_carrito WHERE id_carrito = $1', [id_carrito]);
      const cartDto = new CartDTO({
        id: r.rows[0].id,
        link_invitacion: r.rows[0].link_invitacion,
        estado: r.rows[0].estado,
        fecha_creacion: r.rows[0].fecha_creacion,
        productos: detalles.rows
      });
      res.status(200).json(cartDto);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
}

module.exports = CartController;
