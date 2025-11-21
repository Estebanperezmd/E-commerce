import { ProductRepository } from "../../core/ports/ProductRepository";
import { createProduct } from "../../core/models/product";

export class ProductRepositoryLocal extends ProductRepository {
  constructor() {
    super();

    // Datos "fake", pensados como menú tipo Uber Eats.
    this.products = [
      // Starbucks (restaurantId = 1)
      { id: 1, restaurantId: 1, name: "Latte", price: 4.5 },
      { id: 2, restaurantId: 1, name: "Mocha", price: 5.0 },
      { id: 3, restaurantId: 1, name: "Caramel Macchiato", price: 5.75 },

      // Tim Hortons (restaurantId = 2)
      { id: 4, restaurantId: 2, name: "Ice Capp", price: 3.25 },
      { id: 5, restaurantId: 2, name: "Bagel", price: 2.1 },

      // Chipotle (restaurantId = 3)
      { id: 6, restaurantId: 3, name: "Burrito", price: 10.5 },
      { id: 7, restaurantId: 3, name: "Tacos", price: 9.0 },

      // Denny's (4)
      { id: 8, restaurantId: 4, name: "Pancakes", price: 7.75 },

      // Arby's (5)
      { id: 9, restaurantId: 5, name: "Roast Beef Sandwich", price: 8.25 },

      // Burger King (6)
      { id: 10, restaurantId: 6, name: "Whopper", price: 6.99 },

      // Wendy's (7)
      { id: 11, restaurantId: 7, name: "Baconator", price: 8.99 },
    ];
  }

  async listByRestaurant(restaurantId) {
  if (!restaurantId) {
    throw new Error(
      "restaurantId es obligatorio en ProductRepositoryLocal.listByRestaurant"
    );
  }

  const id = Number(restaurantId); // <-- convertir a número

  const filtered = this.products.filter((p) => p.restaurantId === id);
  return filtered.map(createProduct);
}

}
