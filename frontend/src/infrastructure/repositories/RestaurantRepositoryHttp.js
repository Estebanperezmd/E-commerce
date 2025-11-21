export class RestaurantRepositoryHttp {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  async listByCity(cityId) {
    const res = await fetch(`${this.baseUrl}/restaurantes?cityId=${cityId}`);
    if (!res.ok) throw new Error("Error obteniendo restaurantes");

    return await res.json();
  }
}
