const axios = require('axios');
const ConnectionFactory = require('../../infrastructure/databases/ConnectionFactory');
const CartDTO = require('../dtos/CartDTO');

class CartController {
  static async addProduct(req, res) {
    try {
      const { id_usuario, id_producto, cantidad } = req.body;

      // Validar existencia del usuario (ngrok)
      const userResponse = await axios.get(`https://thin-falcons-wonder.loca.lt/usuarios/${id_usuario}`);
      if (!userResponse.data) return res.status(404).json({ message: 'Usuario no encontrado' });

      // Validar existencia del producto (ngrok)
      const productResponse = await axios.get(`https://fresh-zebras-yawn.loca.lt/productos/${id_producto}`);
      if (!productResponse.data) return res.status(404).json({ message: 'Producto no encontrado' });

      // Insertar producto en carrito
      const query = `
        INSERT INTO carrito (id_usuario, id_producto, cantidad, fecha_creacion)
        VALUES ($1, $2, $3, NOW())
        RETURNING id, id_usuario, id_producto, cantidad, fecha_creacion
      `;
      const result = await ConnectionFactory.query(query, [id_usuario, id_producto, cantidad]);

      const cartDto = new CartDTO(result.rows[0]);
      return res.status(201).json(cartDto);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getCartByUser(req, res) {
    try {
      const { idUsuario } = req.params;
      const query = `SELECT * FROM carrito WHERE id_usuario = $1`;
      const result = await ConnectionFactory.query(query, [idUsuario]);

      if (result.rows.length === 0)
        return res.status(404).json({ message: 'Carrito vacío o usuario no encontrado' });

      const cartItems = result.rows.map(row => new CartDTO(row));
      res.status(200).json(cartItems);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = CartController;
