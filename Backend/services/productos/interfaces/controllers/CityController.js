// interfaces/controllers/CityController.js
const CityRepositoryImpl = require("../../infrastructure/repositories/CityRepositoryImpl");

class CityController {
  constructor() {
    this.repo = new CityRepositoryImpl();
  }

  async getAll(req, res) {
    try {
      const cities = await this.repo.findAll();
      res.json(cities);
    } catch (error) {
      console.error("Error en CityController.getAll:", error);
      res
        .status(500)
        .json({ error: "Error al obtener ciudades: " + error.message });
    }
  }
}

module.exports = new CityController();
