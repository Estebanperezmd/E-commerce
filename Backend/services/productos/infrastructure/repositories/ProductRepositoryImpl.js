// products/infrastructure/repositories/ProductRepositoryImpl.js

// NO usamos la entidad de dominio ni validaciones de categoría, etc.
const ConnectionFactory = require('../databases/ConnectionFactory');

class ProductRepositoryImpl {
  /**
   * Obtiene todos los productos, opcionalmente filtrados por restaurante
   * filters: { restaurantId?: number }
   */
  async findAll(filters = {}) {
    try {
      const { restaurantId } = filters;

      let sql = `
        SELECT id, restaurant_id, name, price, created_at
        FROM products
      `;
      const params = [];

      if (restaurantId) {
        sql += ' WHERE restaurant_id = $1';
        params.push(restaurantId);
      }

      const result = await ConnectionFactory.query(sql, params);
      const rows = Array.isArray(result) ? result : result?.rows || [];

      return rows.map((row) => this._mapRow(row));
    } catch (error) {
      throw new Error(`Error al buscar productos: ${error.message}`);
    }
  }

  /**
   * Busca un producto por ID
   */
  async findById(id) {
    try {
      const sql = `
        SELECT id, restaurant_id, name, price, created_at
        FROM products
        WHERE id = $1
      `;
      const result = await ConnectionFactory.query(sql, [id]);
      const rows = Array.isArray(result) ? result : result?.rows || [];
      if (rows.length === 0) return null;
      return this._mapRow(rows[0]);
    } catch (error) {
      throw new Error(`Error al buscar producto: ${error.message}`);
    }
  }

  /**
   * Métodos de escritura NO implementados (no los necesitas para mañana).
   * Si alguien los llama, verás un error claro.
   */
  async create() {
    throw new Error('create() no implementado para este demo (solo lectura)');
  }

  async update() {
    throw new Error('update() no implementado para este demo (solo lectura)');
  }

  async delete() {
    throw new Error('delete() no implementado para este demo (solo lectura)');
  }

  async updateStock() {
    throw new Error('updateStock() no implementado para este demo (solo lectura)');
  }

  async findByCategoria() {
    throw new Error('findByCategoria() no implementado (no hay columna categoria)');
  }

  async hasStock() {
    throw new Error('hasStock() no implementado (no hay columna stock)');
  }

  /**
   * Adaptar fila de BD → objeto plano para el controlador
   */
  _mapRow(row) {
    // price viene como número o string tipo "$5.85"
    let priceNum = 0;
    if (row.price != null) {
      if (typeof row.price === 'number') priceNum = row.price;
      else {
        const cleaned = String(row.price).replace(/[^0-9.,]/g, '').replace(',', '.');
        priceNum = Number(cleaned) || 0;
      }
    }

    return {
      id: row.id,
      name: row.name,
      price: priceNum,
      restaurantId: row.restaurant_id,
      createdAt: row.created_at,
    };
  }
}

module.exports = ProductRepositoryImpl;
