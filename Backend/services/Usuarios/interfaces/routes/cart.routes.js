const { Router } = require("express");
const CartController = require("../controllers/CartController");

const router = Router();

// Asegura carrito para un usuario
router.post("/ensure", CartController.ensureCartForUser);

module.exports = router;
