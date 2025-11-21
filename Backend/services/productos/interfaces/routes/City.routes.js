const { Router } = require("express");
const CityController = require("../controllers/CityController");

const router = Router();

// GET /ciudades
router.get("/", (req, res) => CityController.getAll(req, res));

module.exports = router;
