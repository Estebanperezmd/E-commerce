const { Router } = require("express");
const OrderController = require("../controllers/OrderController");

const router = Router();

// POST / (crear pedido)
router.post("/", OrderController.createOrder);

// GET /:id (obtener pedido por id)
router.get("/:id", OrderController.getOrderById);

module.exports = router;
