import AppRouter from "./router";
import { AuthProvider } from "./AuthContext";
import { CartProvider } from "./CartContext";

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <AppRouter />
      </CartProvider>
    </AuthProvider>
  );
}
