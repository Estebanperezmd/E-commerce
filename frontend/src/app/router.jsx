import { Routes, Route } from "react-router-dom";
import LoginPage from "../ui/pages/LoginPage";
import HomePage from "../ui/pages/HomePage";
import RestaurantPage from "../ui/pages/RestaurantPage";
import ProfilePage from "../ui/pages/ProfilePage";
import CartPage from "../ui/pages/CartPage";
import PaymentPage from "../ui/pages/PaymentPage";
import RegisterPage from "../ui/pages/RegisterPage";
import JoinCartPage from "../ui/pages/JoinCartPage";
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
       <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/join/:cartId/:ownerId" element={<JoinCartPage />} />

      {/* otras rutas si las tienes */}
    </Routes>
  );
}
