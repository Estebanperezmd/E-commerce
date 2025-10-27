const ConnectionFactory = require('../../infrastructure/databases/ConnectionFactory');

class CreateOrder {
  static async execute({ id_carrito }) {
    const insertQuery = `
      INSERT INTO orders (id_carrito, created_at, status)
      VALUES ($1, NOW(), 'pending')
      RETURNING id, created_at, status
    `;
    const result = await ConnectionFactory.query(insertQuery, [id_carrito]);
    return result.rows[0];
  }
}

module.exports = CreateOrder;
