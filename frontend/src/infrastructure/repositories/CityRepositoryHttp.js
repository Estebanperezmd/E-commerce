export class CityRepositoryHttp {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  async listAll() {
  const url = `${this.baseUrl}/ciudades`;
  console.log("📡 Fetching ciudades desde:", url); // 👈 Agregado
  const res = await fetch(url);
  if (!res.ok) throw new Error("Error obteniendo ciudades");
  return await res.json();
}

}
