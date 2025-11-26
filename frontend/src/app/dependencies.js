import { CityRepositoryHttp } from "../infrastructure/repositories/CityRepositoryHttp";
import { RestaurantRepositoryHttp } from "../infrastructure/repositories/RestaurantRepositoryHttp";
import { ProductRepositoryHttp } from "../infrastructure/repositories/ProductRepositoryHttp";
import { AuthRepositoryHttp } from "../infrastructure/repositories/AuthRepositoryHttp";

//            ^^^^^^^^^^^^^  asumiendo que ese archivo exporta por defecto


// Usa la URL pública de ngrok para producción
const USUARIOS_BASE_URL = "https://leda-proalien-kiersten.ngrok-free.dev"; // usuarios (3002, ngrok)
const CATALOGO_BASE_URL = "https://leda-proalien-kiersten.ngrok-free.dev"; // productos (3005)
const PAGOS_BASE_URL = "https://leda-proalien-kiersten.ngrok-free.dev"; // pagos (3006)

export const repositories = {
  authRepository: new AuthRepositoryHttp(USUARIOS_BASE_URL),
  cityRepository: new CityRepositoryHttp(CATALOGO_BASE_URL),
  restaurantRepository: new RestaurantRepositoryHttp(CATALOGO_BASE_URL),
  productRepository: new ProductRepositoryHttp(CATALOGO_BASE_URL),
  // Si tienes un repositorio de pagos, agrégalo aquí usando PAGOS_BASE_URL
};