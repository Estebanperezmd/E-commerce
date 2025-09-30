const ConnectionFactory = require('../../infrastructure/databases/ConnectionFactory');
const User = require('../../domain/entities/User');

class CreateUser {
  static async execute({ nombre, email, password, direccion }) {
    const q = `
      INSERT INTO usuarios (nombre, email, password, direccion)
      VALUES ($1, $2, $3, $4)
      RETURNING id, nombre, email, direccion
    `;
    const values = [nombre, email, password, direccion];
    const result = await ConnectionFactory.query(q, values);
    const row = result.rows[0];
    return new User(row.id, row.nombre, row.email, null, row.direccion);
  }
}

module.exports = CreateUser;
