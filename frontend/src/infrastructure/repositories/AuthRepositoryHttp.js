// frontend/src/infrastructure/repositories/AuthRepositoryHttp.js

const AUTH_STORAGE_KEY = "currentUser";

export class AuthRepositoryHttp {
  constructor(baseUrl) {
    this.baseUrl = baseUrl; // ej: http://localhost:3002
  }

  /**
   * REGISTRO de usuario en el micro de Usuarios.
   * Espera que el backend reciba: { nombre, correo, contraseña }
   */
  async register({ nombre, correo, password }) {
    const res = await fetch(`${this.baseUrl}/usuarios`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nombre,
        correo,
        contraseña: password, // 👈 clave en español para el backend
      }),
    });

    if (!res.ok) {
      let msg = "Error al crear usuario";
      try {
        const data = await res.json();
        msg = data.error || data.message || msg;
      } catch {
        // ignoramos error parseando JSON
      }
      throw new Error(msg);
    }

    // El backend devuelve el usuario creado
    const usuario = await res.json();
    return usuario;
  }

  /**
   * LOGIN contra el micro de usuarios.
   * Para no enredarnos, asumimos que el backend ya tiene /usuarios/login
   * que acepta { emailOrUsername, password } o similar.
   * (ajusta si tu endpoint usa nombres distintos)
   */
  async login(emailOrUsername, password) {
    const res = await fetch(`${this.baseUrl}/usuarios/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        emailOrUsername,
        password,
      }),
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
    // Espero algo tipo: { user: { id, nombre, email }, token }
    const user = data.user || {
      id: data.id,
      nombre: data.nombre || data.name || "",
      email: data.email,
    };

    const token = data.token || user.token || null;

    const toStore = { ...user, token };
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(toStore));
    return { user: toStore, token };
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
