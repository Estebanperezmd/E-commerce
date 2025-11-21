// infrastructure/repositories/ProductRepositoryHttp.js

export class ProductRepositoryHttp {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  async listByRestaurant(restaurantId) {
    const res = await fetch(
      `${this.baseUrl}/productos?restaurantId=${restaurantId}`
    );

    if (!res.ok) {
      throw new Error("Error obteniendo productos del backend");
    }

    const data = await res.json();

    // Adaptamos la forma a lo que usa el frontend
    return data.map((p) => ({
      id: p.id,
      name: p.name,
      price: p.price,
      restaurantId: p.restaurantId,
    }));
  }
}
