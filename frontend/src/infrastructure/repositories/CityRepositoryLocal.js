import { CityRepository } from "../../core/ports/CityRepository";
import { createCity } from "../../core/models/city";

export class CityRepositoryLocal extends CityRepository {
  constructor() {
    super();
    this.cities = [
      { id: 1, name: "Toronto" },
      { id: 2, name: "Kingston" },
      { id: 3, name: "Hamilton" },
    ];
  }

  async listCities() {
    // Más adelante esto será un fetch al backend.
    return this.cities.map(createCity);
  }
}
