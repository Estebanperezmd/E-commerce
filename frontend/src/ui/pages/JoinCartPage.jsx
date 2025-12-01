import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../../app/AuthContext";

export default function JoinCartPage() {
  const { cartId, ownerId } = useParams();
  const { auth } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Si NO está logeado -> pedir login pero recordar adónde volver
    if (!auth?.user) {
      localStorage.setItem("pending_shared_cart", JSON.stringify({ cartId, ownerId }));
      navigate("/login");
      return;
    }

    // Si YA está logeado → enviarlo al carrito directamente
    navigate(`/cart?shared=${cartId}`);
  }, [auth, cartId, ownerId, navigate]);

  return null;
}
