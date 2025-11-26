// infrastructure/repositories/AuthRepositoryHttp.js

const AUTH_STORAGE_KEY = "currentUser";

export class AuthRepositoryHttp {
  constructor(baseUrl) {
    this.baseUrl = baseUrl; // ej: http://localhost:3002
  }

  /**
   * Inicia sesión contra el micro de usuarios.
   * @param {string} email
   * @param {string} password
   */
  async login(email, password) {
    const res = await fetch(`${this.baseUrl}/usuarios/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ emailOrUsername: email, password }),
    });

    if (!res.ok) {
      let msg = "Error al iniciar sesión";
      try {
        const data = await res.json();
        msg = data.error || data.message || msg;
      } catch {
        // ignoramos error parseando JSON
      }
      throw new Error(msg);
    }

    const data = await res.json();
    // Espero algo tipo: { id, nombre, email, token? }
    const user = {
      id: data.id,
      nombre: data.nombre || data.name || "",
      email: data.email,
      token: data.token || null,
    };

    // Guardar en localStorage para usarlo luego (PaymentPage, etc.)
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
    return user;
  }

  logout() {
    localStorage.removeItem(AUTH_STORAGE_KEY);
  }

  /**
   * Devuelve el usuario actual desde localStorage, o null si no hay.
   */
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
