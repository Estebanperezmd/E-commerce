// infrastructure/repositories/RestaurantRepositoryImpl.js
const ConnectionFactory = require("../databases/ConnectionFactory");

class RestaurantRepositoryImpl {
  async findByCity(cityId) {
    const sql = `
      SELECT id, name, city_id, url, created_at
      FROM restaurants
      WHERE city_id = $1
      ORDER BY id
    `;

    const result = await ConnectionFactory.query(sql, [cityId]);
    const rows = Array.isArray(result) ? result : result?.rows || [];

    return rows.map((row) => ({
      id: row.id,
      name: row.name,
      cityId: row.city_id,
      url: row.url,
      createdAt: row.created_at,
    }));
  }
}

module.exports = RestaurantRepositoryImpl;
