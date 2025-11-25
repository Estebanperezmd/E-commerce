const express = require("express");
const UserService = require("../../application/UserService");

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

module.exports = router;

