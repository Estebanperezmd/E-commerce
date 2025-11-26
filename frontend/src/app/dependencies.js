import { CityRepositoryHttp } from "../infrastructure/repositories/CityRepositoryHttp";
import { RestaurantRepositoryHttp } from "../infrastructure/repositories/RestaurantRepositoryHttp";
import { ProductRepositoryHttp } from "../infrastructure/repositories/ProductRepositoryHttp";
import { AuthRepositoryHttp } from "../infrastructure/repositories/AuthRepositoryHttp";

//            ^^^^^^^^^^^^^  asumiendo que ese archivo exporta por defecto


const CATALOGO_BASE_URL = "http://localhost:3005";  // productos, ciudades, restaurantes
const USUARIOS_BASE_URL = "http://localhost:3002";  // micro de usuarios

export const repositories = {
  authRepository: new AuthRepositoryHttp(USUARIOS_BASE_URL),
  cityRepository: new CityRepositoryHttp(CATALOGO_BASE_URL),
  restaurantRepository: new RestaurantRepositoryHttp(CATALOGO_BASE_URL),
  productRepository: new ProductRepositoryHttp(CATALOGO_BASE_URL),
};