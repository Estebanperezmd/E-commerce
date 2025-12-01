const { Router } = require("express");
const UserController = require("../controllers/UserController");

const router = Router();
const userController = new UserController();

// 🔓 Rutas públicas
router.post("/register", (req, res) => userController.create(req, res));
router.post("/login", (req, res) => userController.login(req, res));

// 🔐 (opcionales) si ya tienes estos métodos en el controller
router.get("/", (req, res) => userController.getAll(req, res));
router.get("/:id", (req, res) => userController.findById(req, res));
// router.put("/:id", (req, res) => userController.update(req, res));
// router.delete("/:id", (req, res) => userController.delete(req, res));

module.exports = router;
