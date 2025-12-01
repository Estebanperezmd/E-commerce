// Backend/services/Usuarios/application/services/UserService.js
const UsuarioRepository = require("../../infrastructure/repositories/UsuarioRepository");
const Usuario = require("../../domain/entities/Usuario");

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
    const usuario = new Usuario(
      null,
      data.nombre,
      data.correo,
      data.contraseña
    );
    return await this.usuarioRepository.create(usuario);
  }

  async login(emailOrUsername, password) {
    // Buscar por email o username usando el repositorio
    const usuarios = await this.usuarioRepository.findAll();

    const encontrado = usuarios.find((u) => {
      const byEmail = u.correo === emailOrUsername;
      const byUser = u.nombre === emailOrUsername;
      return (byEmail || byUser) && u.contraseña === password;
    });

    return encontrado || null;
  }
}

module.exports = UserService;
