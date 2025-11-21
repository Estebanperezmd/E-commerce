import { Routes, Route } from "react-router-dom";
import LoginPage from "../ui/pages/LoginPage";
import HomePage from "../ui/pages/HomePage";
import RestaurantPage from "../ui/pages/RestaurantPage";
import ProfilePage from "../ui/pages/ProfilePage";
import CartPage from "../ui/pages/CartPage";
import PaymentPage from "../ui/pages/PaymentPage";
// (FriendsPage y SharedCartsPage si ya las tienes)

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/restaurant/:restaurantId" element={<RestaurantPage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/payment" element={<PaymentPage />} />
      {/* otras rutas si las tienes */}
    </Routes>
  );
}
