// infrastructure/repositories/AuthRepositoryHttp.js

const AUTH_STORAGE_KEY = "currentUser";

export class AuthRepositoryHttp {
  constructor(baseUrl) {
    this.baseUrl = baseUrl; // ej: http://localhost:3002
  }

  /**
   * Inicia sesión contra el micro de usuarios.
   * @param {string} emailOrUsername
   * @param {string} password
   */
  async login(emailOrUsername, password) {
    const res = await fetch(`${this.baseUrl}/usuarios/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ emailOrUsername, password }),
    });

    if (!res.ok) {
      let msg = "Error al iniciar sesión";
      try {
        const data = await res.json();
        msg = data.error || data.message || msg;
      } catch {
        //nothing
        } 
      throw new Error(msg);
    }

    // 🔥 Ahora sí: la respuesta REAL del backend
    const data = await res.json();

    // 🔥 El backend devuelve: { user: {...}, token }
    const user = {
      id: data.user.id,
      username: data.user.username,
      name: data.user.name,
      email: data.user.email,
    };

    const token = data.token;

    // Guardar en localStorage
    localStorage.setItem(
      AUTH_STORAGE_KEY,
      JSON.stringify({ user, token })
    );

    // Devolver igual al AuthContext
    return { user, token };
  }

  logout() {
    localStorage.removeItem(AUTH_STORAGE_KEY);
  }

  getCurrentUser() {
    try {
      const raw = localStorage.getItem(AUTH_STORAGE_KEY);
      if (!raw) return null;
      return JSON.parse(raw);
    } catch {
      return null;
    }
  }
}
