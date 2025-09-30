const ConnectionFactory = require('../../infrastructure/databases/ConnectionFactory');

class AddToCart {
  static async execute({ id_carrito, id_producto, cantidad = 1, id_usuario = null }) {
    const insertQuery = `
      INSERT INTO detalle_carrito (id_carrito, id_producto, cantidad, id_usuario, confirmado)
      VALUES ($1, $2, $3, $4, false)
      RETURNING id_carrito, id_producto, cantidad, id_usuario
    `;
    const values = [id_carrito, id_producto, cantidad, id_usuario];
    const result = await ConnectionFactory.query(insertQuery, values);
    return result.rows[0];
  }
}

module.exports = AddToCart;
