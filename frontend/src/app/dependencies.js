import { CityRepositoryHttp } from "../infrastructure/repositories/CityRepositoryHttp";
import { RestaurantRepositoryHttp } from "../infrastructure/repositories/RestaurantRepositoryHttp";
import { ProductRepositoryHttp } from "../infrastructure/repositories/ProductRepositoryHttp";
import { AuthRepositoryHttp } from "../infrastructure/repositories/AuthRepositoryHttp";

//            ^^^^^^^^^^^^^  asumiendo que ese archivo exporta por defecto


// Usa la URL pública de ngrok para producción
const USUARIOS_BASE_URL = "https://thin-falcons-wonder.loca.lt"; // usuarios (3002, LocalTunnel)
const CATALOGO_BASE_URL = "https://fresh-zebras-yawn.loca.lt"; // productos (3005, LocalTunnel)
const PAGOS_BASE_URL = "https://deep-chairs-melt.loca.lt"; // pagos (3006, LocalTunnel)

export const repositories = {
  authRepository: new AuthRepositoryHttp(USUARIOS_BASE_URL),
  cityRepository: new CityRepositoryHttp(CATALOGO_BASE_URL),
  restaurantRepository: new RestaurantRepositoryHttp(CATALOGO_BASE_URL),
  productRepository: new ProductRepositoryHttp(CATALOGO_BASE_URL),
  // Si tienes un repositorio de pagos, agrégalo aquí usando PAGOS_BASE_URL
};