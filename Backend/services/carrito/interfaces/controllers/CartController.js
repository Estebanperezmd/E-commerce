const CartService = require('../../application/services/CartService');
const CartRepositoryImpl = require('../../infrastructure/repositories/CartRepositoryImpl');

const repository = new CartRepositoryImpl();
const cartService = new CartService(repository);

class CartController {
  static async create(req, res) {
    try {
      const result = await cartService.createCart();
      res.status(201).json(result);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async addProduct(req, res) {
    try {
      const data = { ...req.body, id_carrito: Number(req.params.id_carrito) };
      const result = await cartService.addProduct(data);
      res.status(200).json(result);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async findCart(req, res) {
    try {
      const result = await cartService.getCart(Number(req.params.id_carrito));
      res.status(200).json(result);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
}

module.exports = CartController;
