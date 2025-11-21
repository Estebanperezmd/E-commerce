import { useNavigate } from "react-router-dom";
import { useCart } from "../../app/CartContext";
import AppLayout from "../components/AppLayout";
import "./PaymentPage.css";

export default function PaymentPage() {
  const { items, selectedTotal, clearCart } = useCart();
  const navigate = useNavigate();

  const selectedItems = items.filter((it) => it.selected);

  if (selectedItems.length === 0) {
    return (
      <AppLayout title="Pago" subtitle="">
        <p>No hay productos seleccionados para pagar.</p>
      </AppLayout>
    );
  }

  const handleConfirm = () => {
    console.log("Pagando items:", selectedItems);
    clearCart();
    navigate("/home");
  };

  return (
    <AppLayout title="Pago" subtitle="Confirma tu compra.">
      <button className="back-button" onClick={() => navigate("/cart")}>
        ← Volver
      </button>

      <ul className="payment-list">
        {selectedItems.map(({ product, restaurant, quantity }) => (
          <li key={product.id} className="payment-item">
            <div>
              <strong>{product.name}</strong>
              {restaurant?.name && (
                <div className="payment-item__restaurant">
                  {restaurant.name}
                </div>
              )}
              <div className="payment-item__meta">
                Cantidad: {quantity} · Precio: ${product.price.toFixed(2)}
              </div>
            </div>
            <div className="payment-item__subtotal">
              ${(product.price * quantity).toFixed(2)}
            </div>
          </li>
        ))}
      </ul>

      <div className="payment-summary">
        <p>
          Total a pagar: <strong>${selectedTotal.toFixed(2)}</strong>
        </p>
        <button className="payment-confirm" onClick={handleConfirm}>
          Confirmar pago (simulado)
        </button>
      </div>
    </AppLayout>
  );
}
