// interfaces/routes/cartRoutes.js
const { Router } = require("express");
const CartController = require("../controllers/CartController");

const router = Router();

// Asegura carrito para un usuario
router.post("/ensure", CartController.ensureCartForUser);

// (si tienes más rutas, déjalas aquí)
// router.post("/", CartController.addProduct);
// router.get("/:idUsuario", CartController.getCartByUser);

module.exports = router;
