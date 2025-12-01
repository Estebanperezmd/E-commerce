// interfaces/controllers/CartController.js
const CartRepositoryImpl = require("../../infrastructure/repositories/CartRepositoryImpl");
const cartRepo = new CartRepositoryImpl();

class CartController {
  static async ensureCartForUser(req, res) {
    try {
      const { userId } = req.body;

      if (!userId) {
        return res.status(400).json({ error: "userId es requerido" });
      }

      const cart = await cartRepo.ensureCartForUser(Number(userId));
      return res.status(200).json(cart);
    } catch (err) {
      console.error("Error ensureCartForUser:", err);
      res.status(500).json({ error: "Error asegurando carrito" });
    }
  }
}

module.exports = CartController;
