// infrastructure/repositories/CartRepositoryHttp.js

export class CartRepositoryHttp {
  constructor(baseUrl) {
    this.baseUrl = baseUrl; // ej: http://localhost:3007
  }

  /**
   * Crea un carrito para un usuario y devuelve:
   * { id_carrito, status, fecha_creacion, invitation_link, id_main_user }
   */
  async createCart(userId) {
    const res = await fetch(`${this.baseUrl}/create`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId }),
    });

    if (!res.ok) {
      let msg = "Error creando carrito";
      try {
        const data = await res.json();
        msg = data.error || data.details || msg;
      } catch {
        // ignoramos error parseando
      }
      throw new Error(msg);
    }

    return await res.json();
  }
}
