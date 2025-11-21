import { CityRepositoryLocal } from "../infrastructure/repositories/CityRepositoryLocal";
import { RestaurantRepositoryLocal } from "../infrastructure/repositories/RestaurantRepositoryLocal";
import { ProductRepositoryLocal } from "../infrastructure/repositories/ProductRepositoryLocal";
import { AuthRepositoryLocal } from "../infrastructure/repositories/AuthRepositoryLocal";

export const repositories = {
  cityRepository: new CityRepositoryLocal(),
  restaurantRepository: new RestaurantRepositoryLocal(),
  productRepository: new ProductRepositoryLocal(),
  authRepository: new AuthRepositoryLocal(),
};
