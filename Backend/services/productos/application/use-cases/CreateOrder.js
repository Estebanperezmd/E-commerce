const ConnectionFactory = require('../../infrastructure/databases/ConnectionFactory');

class CreateOrder {
  /**
   * Crea un pedido a partir de un carrito
   * @param {Object} param0 { id_carrito }
   */
  static async execute({ id_carrito }) {
    const insertPedido = `
      INSERT INTO pedido (id_carrito, fecha, estado)
      VALUES ($1, NOW(), 'CREADO')
      RETURNING id, fecha, estado
    `;
    const resPedido = await ConnectionFactory.query(insertPedido, [id_carrito]);
    const pedido = resPedido.rows[0];
    return {
      id_pedido: pedido.id,
      fecha: pedido.fecha,
      estado: pedido.estado
    };
  }
}

module.exports = CreateOrder;
