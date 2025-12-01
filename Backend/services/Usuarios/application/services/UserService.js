// services/Usuarios/application/services/UserService.js

const usuarioRepository = require('../../infrastructure/repositories/UsuarioRepository');
const Usuario = require('../../domain/entities/Usuario');

class UserService {
  constructor(repo = usuarioRepository) {
    this.usuarioRepository = repo;
  }

  async getUsuarios() {
    return this.usuarioRepository.findAll();
  }

  async getUsuario(id) {
    return this.usuarioRepository.findById(id);
  }

  async crearUsuario(data) {
    // Normalizamos campos que pueden venir con nombres distintos
    const nombre =
      data.nombre || data.username || data.user || data.name;
    const correo =
      data.correo || data.email;
    const contraseña =
      data.contraseña || data.password;

    if (!nombre || !correo || !contraseña) {
      throw new Error(
        "Faltan datos obligatorios (nombre / usuario, correo / email, contraseña / password)"
      );
    }

    const usuario = new Usuario(null, nombre, correo, contraseña);
    return this.usuarioRepository.create(usuario);
  }
}

module.exports = UserService;
