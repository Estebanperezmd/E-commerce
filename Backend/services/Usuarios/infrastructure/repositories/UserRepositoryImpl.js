const IUserRepository = require('../../domain/repositories/IUserRepository');
const User = require('../../domain/entities/User');
const ConnectionFactory = require('../databases/ConnectionFactory');

class UserRepositoryImpl extends IUserRepository {
  async create(user) {
    const query = `
      INSERT INTO usuarios (nombre, email, password, rol)
      VALUES ($1, $2, $3, $4)
      RETURNING id, nombre, email, rol, fecha_creacion
    `;
    const values = [user.nombre, user.email, user.password, user.rol];
    const result = await ConnectionFactory.query(query, values);
    return new User(
      result.rows[0].id,
      result.rows[0].nombre,
      result.rows[0].email,
      result.rows[0].password,
      result.rows[0].rol,
      result.rows[0].fecha_creacion
    );
  }

  async findById(id) {
    const query = 'SELECT * FROM usuarios WHERE id = $1';
    const result = await ConnectionFactory.query(query, [id]);
    if (result.rows.length === 0) return null;
    
    const user = result.rows[0];
    return new User(
      user.id,
      user.nombre,
      user.email,
      user.password,
      user.rol,
      user.fecha_creacion
    );
  }

  async findByEmail(email) {
    const query = 'SELECT * FROM usuarios WHERE email = $1';
    const result = await ConnectionFactory.query(query, [email]);
    if (result.rows.length === 0) return null;
    
    const user = result.rows[0];
    return new User(
      user.id,
      user.nombre,
      user.email,
      user.password,
      user.rol,
      user.fecha_creacion
    );
  }

  async update(id, userData) {
    const query = `
      UPDATE usuarios 
      SET nombre = $1, email = $2, password = $3, rol = $4
      WHERE id = $5
      RETURNING id, nombre, email, rol, fecha_creacion
    `;
    const values = [userData.nombre, userData.email, userData.password, userData.rol, id];
    const result = await ConnectionFactory.query(query, values);
    return new User(
      result.rows[0].id,
      result.rows[0].nombre,
      result.rows[0].email,
      result.rows[0].password,
      result.rows[0].rol,
      result.rows[0].fecha_creacion
    );
  }

  async delete(id) {
    const query = 'DELETE FROM usuarios WHERE id = $1';
    await ConnectionFactory.query(query, [id]);
    return true;
  }
}

module.exports = UserRepositoryImpl;