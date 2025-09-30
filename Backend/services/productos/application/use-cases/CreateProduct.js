const ConnectionFactory = require('../../infrastructure/databases/ConnectionFactory');
const Product = require('../../domain/entities/Product');

class CreateProduct {
  static async execute({ nombre, precio, stock }) {
    const query = `
      INSERT INTO productos (nombre, precio, stock)
      VALUES ($1, $2, $3)
      RETURNING id, nombre, precio, stock
    `;
    const values = [nombre, precio, stock];
    const result = await ConnectionFactory.query(query, values);
    const row = result.rows[0];
    return new Product(row.id, row.nombre, row.precio, row.stock);
  }
}

module.exports = CreateProduct;
