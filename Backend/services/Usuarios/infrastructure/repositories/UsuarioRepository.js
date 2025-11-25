const ConnectionFactory = require('../databases/ConnectionFactory');
const Usuario = require('../../domain/Usuario');

class UsuarioRepository {
  
  async findAll() {
    const client = await ConnectionFactory.getConnection();

    const query = 'SELECT id, nombre, correo, contraseña FROM usuario';
    const result = await client.query(query);

    client.release();

    return result.rows.map(
      row => new Usuario(row.id, row.nombre, row.correo, row.contraseña)
    );
  }

  async findById(id) {
    const client = await ConnectionFactory.getConnection();

    const query = 'SELECT id, nombre, correo, contraseña FROM usuario WHERE id = $1';
    const result = await client.query(query, [id]);

    client.release();

    if (result.rows.length === 0) return null;

    const row = result.rows[0];
    return new Usuario(row.id, row.nombre, row.correo, row.contraseña);
  }

  async create(usuario) {
    const client = await ConnectionFactory.getConnection();

    const query = `
      INSERT INTO usuario (nombre, correo, contraseña)
      VALUES ($1, $2, $3)
      RETURNING id
    `;

    const values = [usuario.nombre, usuario.correo, usuario.contraseña];

    const result = await client.query(query, values);
    client.release();

    usuario.id = result.rows[0].id;
    return usuario;
  }
}

module.exports = UsuarioRepository;
