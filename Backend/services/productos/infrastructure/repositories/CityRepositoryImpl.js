// infrastructure/repositories/CityRepositoryImpl.js
const ConnectionFactory = require("../databases/ConnectionFactory");

class CityRepositoryImpl {
  async findAll() {
    const sql = `
      SELECT id, name, created_at
      FROM cities
      ORDER BY id
    `;

    const result = await ConnectionFactory.query(sql);
    const rows = Array.isArray(result) ? result : result?.rows || [];

    return rows.map((row) => ({
      id: row.id,
      name: row.name,
      createdAt: row.created_at,
    }));
  }
}

module.exports = CityRepositoryImpl;
