// Backend/services/Usuarios/infrastructure/repositories/UsuarioRepository.js

const { getConnection } = require("../databases/ConnectionFactory");
const Usuario = require("../../domain/entities/Usuario");

class UsuarioRepository {
  async findAll() {
    const dataSource = await getConnection();

    const query = `
      SELECT
        id,
        users    AS nombre,
        email    AS correo,
        password AS contraseña
      FROM "Usuarios"
    `;
    const rows = await dataSource.query(query);

    return rows.map(
      (row) => new Usuario(row.id, row.nombre, row.correo, row.contraseña)
    );
  }

  async findById(id) {
    const dataSource = await getConnection();

    const query = `
      SELECT
        id,
        users    AS nombre,
        email    AS correo,
        password AS contraseña
      FROM "Usuarios"
      WHERE id = $1
    `;
    const rows = await dataSource.query(query, [id]);

    if (rows.length === 0) return null;

    const row = rows[0];
    return new Usuario(row.id, row.nombre, row.correo, row.contraseña);
  }

  async create(usuario) {
    const dataSource = await getConnection();

    const query = `
      INSERT INTO "Usuarios" (users, password, name, email, card_information)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING id
    `;

    const rows = await dataSource.query(query, [
      usuario.nombre,       // users
      usuario.contraseña,   // password
      usuario.nombre,       // name
      usuario.correo,       // email
      null,                 // card_information
    ]);

    usuario.id = rows[0].id;
    return usuario;
  }
}

module.exports = UsuarioRepository;
