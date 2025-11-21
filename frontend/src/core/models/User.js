// Representa un usuario de la aplicación.
// Mapea contra la tabla `Usuarios` (users, password, name, email)
//
// User {
//   id: number,
//   username: string,   // columna `users` en BD
//   email: string,
//   name?: string
// }

/**
 * Crea un objeto User inmutable.
 * @param {{ id: number, username: string, email: string, name?: string }} data
 */
export function createUser(data) {
  return Object.freeze({
    id: data.id,
    username: data.username,
    email: data.email,
    name: data.name ?? null,
  });
}
