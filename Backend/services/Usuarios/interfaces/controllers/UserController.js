// services/Usuarios/interfaces/controllers/UserController.js

const express = require("express");
const UserService = require("../../application/services/UserService");

const router = express.Router();
const userService = new UserService();

// Obtener todos los usuarios
router.get("/", async (req, res) => {
  try {
    const usuarios = await userService.getUsuarios();
    res.json(usuarios);
  } catch (error) {
    console.error("Error al obtener usuarios:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

// Obtener un usuario por ID
router.get("/:id", async (req, res) => {
  try {
    const usuario = await userService.getUsuario(req.params.id);

    if (!usuario) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    res.json(usuario);
  } catch (error) {
    console.error("Error al obtener usuario:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

// Crear un nuevo usuario
router.post("/", async (req, res) => {
  try {
    const usuario = await userService.crearUsuario(req.body);
    res.status(201).json(usuario);
  } catch (error) {
    console.error("Error al crear usuario:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

// 🔐 LOGIN: POST /usuarios/login
router.post("/login", async (req, res) => {
  try {
    const { emailOrUsername, password } = req.body;

    if (!emailOrUsername || !password) {
      return res
        .status(400)
        .json({ error: "Faltan credenciales (usuario/email y contraseña)" });
    }

    // Traemos todos los usuarios (para el parcial está bien así)
    const usuarios = await userService.getUsuarios();

    // OJO: propiedades reales: nombre, correo, contraseña
    const usuario = usuarios.find(
      (u) =>
        (u.correo === emailOrUsername || u.nombre === emailOrUsername) &&
        u.contraseña === password
    );

    if (!usuario) {
      return res.status(401).json({ error: "Credenciales inválidas" });
    }

    // Token falso para el front (suficiente para prueba)
    const token = `fake-token-${usuario.id}`;

    return res.json({
      user: {
        id: usuario.id,
        username: usuario.nombre,   // viene de users
        name: usuario.nombre,       // opcional
        email: usuario.correo,      // viene de email
      },
      token,
    });
  } catch (error) {
    console.error("Error en login:", error);
    if (error.stack) console.error(error.stack);
    res.status(500).json({ error: "Error interno del servidor", detalle: error.message });
  }
});

module.exports = router;
