// Caso de uso: listar restaurantes por ciudad.
//
// @param {RestaurantRepository} restaurantRepository
// @param {number} cityId
export async function listRestaurantsByCity(restaurantRepository, cityId) {
  if (!cityId) {
    throw new Error("cityId es obligatorio en listRestaurantsByCity");
  }
  return restaurantRepository.listByCity(cityId);
}
