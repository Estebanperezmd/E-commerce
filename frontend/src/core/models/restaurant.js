// Representa un restaurante de la plataforma.
//
// Restaurant {
//   id: number,
//   name: string,
//   cityId: number,
//   url?: string
// }

/**
 * @param {{ id: number, name: string, cityId: number, url?: string }} data
 */
export function createRestaurant(data) {
  return Object.freeze({
    id: data.id,
    name: data.name,
    cityId: data.cityId,
    url: data.url ?? null,
  });
}
