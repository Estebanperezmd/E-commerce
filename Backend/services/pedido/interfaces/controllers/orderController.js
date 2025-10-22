const axios = require('axios');
const ConnectionFactory = require('../../infrastructure/databases/ConnectionFactory');

class OrderController {
  static async createOrder(req, res) {
    try {
      const { idUsuario } = req.body;

      // Verificar usuario
      const userRes = await axios.get(`http://localhost:3000/usuarios/${idUsuario}`);
      if (!userRes.data) return res.status(404).json({ message: 'Usuario no encontrado' });

      // Verificar carrito
      const cartRes = await axios.get(`http://localhost:3002/carrito/${idUsuario}`);
      if (!cartRes.data || cartRes.data.length === 0)
        return res.status(400).json({ message: 'Carrito vacío o no encontrado' });

      // Crear pedido
      const query = `
        INSERT INTO pedidos (id_usuario, fecha, estado)
        VALUES ($1, NOW(), 'CREADO')
        RETURNING id, id_usuario, fecha, estado
      `;
      const result = await ConnectionFactory.query(query, [idUsuario]);
      res.status(201).json(result.rows[0]);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getOrderById(req, res) {
    try {
      const { id } = req.params;
      const query = `SELECT * FROM pedidos WHERE id = $1`;
      const result = await ConnectionFactory.query(query, [id]);

      if (result.rows.length === 0)
        return res.status(404).json({ message: 'Pedido no encontrado' });

      res.status(200).json(result.rows[0]);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = OrderController;
