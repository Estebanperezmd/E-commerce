// Caso de uso: login de usuario.
//
// @param {AuthRepository} authRepository
// @param {{ emailOrUsername: string, password: string }} credentials
export async function loginUser(authRepository, credentials) {
  if (!credentials?.emailOrUsername || !credentials?.password) {
    throw new Error("Credenciales incompletas");
  }

  // Llama al repositorio real o local
  return authRepository.login(credentials);
}
