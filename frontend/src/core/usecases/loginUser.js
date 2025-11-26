// Caso de uso: login de usuario.
//
// @param {AuthRepository} authRepository
// @param {{ emailOrUsername: string, password: string }} credentials
// core/usecases/loginUser.js
export async function loginUser(authRepository, { emailOrUsername, password }) {
  return authRepository.login(emailOrUsername, password);
}
