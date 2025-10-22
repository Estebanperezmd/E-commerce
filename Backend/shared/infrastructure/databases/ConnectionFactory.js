const { Pool } = require('pg');
const DatabaseConfig = require('./DatabaseConfig');

class ConnectionFactory {
  static pool;

  static async init() {
    if (!this.pool) {
      this.pool = new Pool(DatabaseConfig);
    }
  }

  static async getConnection() {
    if (!this.pool) {
      await this.init();
    }
    return this.pool;
  }

  static async query(text, params) {
    const pool = await this.getConnection();
    return pool.query(text, params);
  }

  static async close() {
    if (this.pool) {
      await this.pool.end();
      this.pool = null;
    }
  }
}

module.exports = ConnectionFactory;