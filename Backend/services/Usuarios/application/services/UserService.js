const UsuarioRepository = require('../../infrastructure/repositories/UsuarioRepository');
const Usuario = require('../../domain/entities/Usuario');

class UserService {
  constructor() {
    this.usuarioRepository = new UsuarioRepository();
  }

  async getUsuarios() {
    return await this.usuarioRepository.findAll();
  }

  async getUsuario(id) {
    return await this.usuarioRepository.findById(id);
  }

  async crearUsuario(data) {
    const usuario = new Usuario(null, data.nombre, data.correo, data.contraseña);
    return await this.usuarioRepository.create(usuario);
  }
}

module.exports = UserService;
