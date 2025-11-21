// Representa un producto (plato / ítem de menú) de un restaurante.
//
// Product {
//   id: number,
//   restaurantId: number,
//   name: string,
//   price: number,
//   createdAt?: string
// }

/**
 * @param {{ id: number, restaurantId: number, name: string, price: number, createdAt?: string }} data
 */
export function createProduct(data) {
  return Object.freeze({
    id: data.id,
    restaurantId: data.restaurantId,
    name: data.name,
    price: Number(data.price),
    createdAt: data.createdAt ?? null,
  });
}
