// interfaces/controllers/RestaurantController.js
const RestaurantRepositoryImpl = require("../../infrastructure/repositories/RestaurantRepositoryImpl");

class RestaurantController {
  constructor() {
    this.repo = new RestaurantRepositoryImpl();
  }

  async getByCity(req, res) {
    try {
      const cityId = Number(req.query.cityId);
      if (!cityId) {
        return res.status(400).json({ error: "cityId es requerido" });
      }

      const restaurants = await this.repo.findByCity(cityId);
      res.json(restaurants);
    } catch (error) {
      console.error("Error en RestaurantController.getByCity:", error);
      res
        .status(500)
        .json({ error: "Error al obtener restaurantes: " + error.message });
    }
  }
}

module.exports = new RestaurantController();
