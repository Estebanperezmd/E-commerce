const { Router } = require("express");
const RestaurantController = require("../controllers/RestaurantController");

const router = Router();

// GET /restaurantes?cityId=1
router.get("/", (req, res) => RestaurantController.getByCity(req, res));

module.exports = router;
