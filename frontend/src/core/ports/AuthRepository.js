// AuthRepository define cómo se hace login / registro.
//
// Métodos esperados:
//
// - login(credentials: { emailOrUsername: string, password: string }): Promise<{ user: User, token: string }>

export class AuthRepository {
  async login(_credentials) {
    throw new Error("AuthRepository.login() no implementado");
  }
}
