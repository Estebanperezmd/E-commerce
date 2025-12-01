// Backend/services/Usuarios/interfaces/routes/user.routes.js
const { Router } = require("express");
const UserController = require("../controllers/UserController");

const router = Router();
const userController = new UserController();

// Obtener todos los usuarios
router.get("/", (req, res) => userController.getAll(req, res));

// Obtener usuario por id
router.get("/:id", (req, res) => userController.findById(req, res));

// Registro de usuario
router.post("/register", (req, res) => userController.create(req, res));

// Login de usuario
router.post("/login", (req, res) => userController.login(req, res));

module.exports = router;
