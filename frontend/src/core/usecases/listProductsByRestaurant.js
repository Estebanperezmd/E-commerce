// Caso de uso: listar productos de un restaurante.
//
// @param {ProductRepository} productRepository
// @param {number} restaurantId
export async function listProductsByRestaurant(productRepository, restaurantId) {
  if (!restaurantId) {
    throw new Error("restaurantId es obligatorio en listProductsByRestaurant");
  }
  return productRepository.listByRestaurant(restaurantId);
}
