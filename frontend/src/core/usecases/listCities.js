// Caso de uso: listar todas las ciudades disponibles.
//
// @param {CityRepository} cityRepository
export async function listCities(cityRepository) {
  return cityRepository.listCities();
}
