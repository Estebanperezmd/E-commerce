import { CityRepositoryHttp } from "../infrastructure/repositories/CityRepositoryHttp";
import { RestaurantRepositoryHttp } from "../infrastructure/repositories/RestaurantRepositoryHttp";
import { ProductRepositoryHttp } from "../infrastructure/repositories/ProductRepositoryHttp";
import { AuthRepositoryLocal } from "../infrastructure/repositories/AuthRepositoryLocal";

//            ^^^^^^^^^^^^^  asumiendo que ese archivo exporta por defecto

const BASE_URL = "http://localhost:3005";

export const repositories = {
  authRepository: new AuthRepositoryLocal(),        // 👈 vuelve el login mock
  cityRepository: new CityRepositoryHttp(BASE_URL),
  restaurantRepository: new RestaurantRepositoryHttp(BASE_URL),
  productRepository: new ProductRepositoryHttp(BASE_URL),
};
