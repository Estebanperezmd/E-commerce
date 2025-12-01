// Backend/services/Usuarios/interfaces/controllers/UserController.js
const UserService = require("../../application/services/UserService");

class UserController {
  constructor() {
    this.userService = new UserService();
  }

  async getAll(req, res) {
    try {
      const usuarios = await this.userService.getUsuarios();
      res.json(usuarios);
    } catch (err) {
      console.error("Error al obtener usuarios:", err);
      res.status(500).json({ error: "Error interno del servidor" });
    }
  }

  async findById(req, res) {
    try {
      const id = Number(req.params.id);
      const usuario = await this.userService.getUsuario(id);
      if (!usuario) {
        return res.status(404).json({ error: "Usuario no encontrado" });
      }
      res.json(usuario);
    } catch (err) {
      console.error("Error al obtener usuario:", err);
      res.status(500).json({ error: "Error interno del servidor" });
    }
  }

  async create(req, res) {
    try {
      const { nombre, correo, contraseña, email, password } = req.body;

      const data = {
        nombre: nombre || email?.split("@")[0] || "sin_nombre",
        correo: correo || email,
        contraseña: contraseña || password,
      };

      if (!data.correo || !data.contraseña) {
        return res
          .status(400)
          .json({ error: "correo/email y contraseña son requeridos" });
      }

      const usuario = await this.userService.crearUsuario(data);
      res.status(201).json(usuario);
    } catch (err) {
      console.error("Error al crear usuario:", err);
      res.status(500).json({ error: "Error interno del servidor" });
    }
  }

  async login(req, res) {
    try {
      const { emailOrUsername, email, password } = req.body;

      const cred = {
        emailOrUsername: emailOrUsername || email,
        password,
      };

      if (!cred.emailOrUsername || !cred.password) {
        return res
          .status(400)
          .json({ error: "email/usuario y contraseña son requeridos" });
      }

      const user = await this.userService.login(cred.emailOrUsername, cred.password);

      if (!user) {
        return res.status(401).json({ error: "Credenciales inválidas" });
      }

      // Aquí podrías generar un token JWT, pero por ahora devolvemos el usuario "plano"
      res.json({
        id: user.id,
        nombre: user.nombre,
        email: user.correo,
        token: null,
      });
    } catch (err) {
      console.error("Error en login:", err);
      res.status(500).json({ error: "Error interno del servidor" });
    }
  }
}

module.exports = UserController;
