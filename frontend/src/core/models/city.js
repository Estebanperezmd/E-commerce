// Representa una ciudad donde hay restaurantes.
//
// City {
//   id: number,
//   name: string,
//   createdAt?: string
// }

/**
 * @param {{ id: number, name: string, createdAt?: string }} data
 */
// Representa una ciudad del sistema.

export function createCity(data) {
  return Object.freeze({
    id: data.id,
    name: data.name,
    createdAt: data.createdAt ?? null,
  });
}
