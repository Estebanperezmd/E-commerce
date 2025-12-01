// core/usecases/registerUser.js

/**
 * Caso de uso: registrar un nuevo usuario.
 *
 * @param {AuthRepositoryHttp} authRepository
 * @param {{ nombre: string, correo: string, password: string }} payload
 */
export async function registerUser(authRepository, payload) {
  return await authRepository.register(payload);
}
