// ProductRepository define cómo obtener productos de un restaurante.
//
// Métodos esperados:
//
// - listByRestaurant(restaurantId: number): Promise<Product[]>

export class ProductRepository {
  async listByRestaurant(_restaurantId) {
    throw new Error("ProductRepository.listByRestaurant() no implementado");
  }
}
