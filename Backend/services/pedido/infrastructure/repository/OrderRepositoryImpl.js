const { AppDataSource } = require('../databases/ConnectionFactory');

class OrderRepositoryImpl {
  constructor() {
    this.repository = AppDataSource.getRepository('Order');
  }

  async createOrder(id_carrito) {
    const query = `
      INSERT INTO pedido (id_carrito, fecha, estado)
      VALUES ($1, NOW(), 'CREADO')
      RETURNING id, id_carrito, fecha, estado
    `;
    const result = await AppDataSource.query(query, [id_carrito]);
    return result[0];
  }

  async findAllOrders() {
    const query = `SELECT * FROM pedido ORDER BY fecha DESC`;
    return await AppDataSource.query(query);
  }

  async findOrderById(id) {
    const query = `SELECT * FROM pedido WHERE id = $1`;
    const result = await AppDataSource.query(query, [id]);
    return result.length > 0 ? result[0] : null;
  }
}

module.exports = OrderRepositoryImpl;
