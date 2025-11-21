import { RestaurantRepository } from "../../core/ports/RestaurantRepository";
import { createRestaurant } from "../../core/models/restaurant";

export class RestaurantRepositoryLocal extends RestaurantRepository {
  constructor() {
    super();

    // Datos de ejemplo. Más adelante esto vendrá del backend.
    this.restaurants = [
      // Toronto (cityId = 1)
      { id: 1, name: "Starbucks Downtown", cityId: 1, url: "" },
      { id: 2, name: "Tim Hortons Main St", cityId: 1, url: "" },
      { id: 3, name: "Chipotle Bloor", cityId: 1, url: "" },

      // Kingston (cityId = 2)
      { id: 4, name: "Denny's Kingston", cityId: 2, url: "" },
      { id: 5, name: "Arby's Kingston", cityId: 2, url: "" },

      // Hamilton (cityId = 3)
      { id: 6, name: "Burger King Hamilton", cityId: 3, url: "" },
      { id: 7, name: "Wendy's Hamilton", cityId: 3, url: "" },
    ];
  }

  async listByCity(cityId) {
    if (!cityId) {
      throw new Error("cityId es obligatorio en RestaurantRepositoryLocal.listByCity");
    }

    const filtered = this.restaurants.filter((r) => r.cityId === cityId);
    return filtered.map(createRestaurant);
  }
}
