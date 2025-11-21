import { AuthRepository } from "../../core/ports/AuthRepository";
import { createUser } from "../../core/models/User";

export class AuthRepositoryLocal extends AuthRepository {
  constructor() {
    super();

    // Usuario "fake" para pruebas.
    this.fakeUser = {
      id: 1,
      username: "demo",
      email: "demo@example.com",
      name: "Usuario Demo",
    };
  }

  /**
   * Simula un login.
   * Acepta:
   *   emailOrUsername: "demo"
   *   password: "123456"
   */
  async login(credentials) {
    const { emailOrUsername, password } = credentials ?? {};

    if (emailOrUsername !== "demo" || password !== "123456") {
      throw new Error("Credenciales inválidas en AuthRepositoryLocal");
    }

    const user = createUser({
      id: this.fakeUser.id,
      username: this.fakeUser.username,
      email: this.fakeUser.email,
      name: this.fakeUser.name,
    });

    // Más adelante, esto vendrá del backend con un JWT
    return {
      user,
      token: "fake-token-demo-123",
    };
  }
}
