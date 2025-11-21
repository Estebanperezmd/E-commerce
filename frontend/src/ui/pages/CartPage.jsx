import { useNavigate } from "react-router-dom";
import { useCart } from "../../app/CartContext";
import AppLayout from "../components/AppLayout";
import "./CartPage.css";

export default function CartPage() {
  const {
    items,
    toggleSelect,
    removeItem,
    clearCart,
    total,
    selectedTotal,
  } = useCart();
  const navigate = useNavigate();

  if (items.length === 0) {
    return (
      <AppLayout title="Carrito" subtitle="">
        <p>Tu carrito está vacío.</p>
      </AppLayout>
    );
  }

  return (
    <AppLayout
      title="Carrito"
      subtitle="Selecciona qué productos quieres pagar."
    >
      <button className="back-button" onClick={() => navigate("/home")}>
        ← Volver
      </button>

      <div className="cart-list">
        {items.map(({ product, restaurant, quantity, selected }) => (
          <div key={product.id} className="cart-card">
            <div className="cart-card__left">
              <input
                type="checkbox"
                checked={selected}
                onChange={() => toggleSelect(product.id)}
              />

              <div className="cart-card__info">
                <h3 className="cart-card__name">{product.name}</h3>
                {restaurant?.name && (
                  <p className="cart-card__restaurant">
                    {restaurant.name}
                  </p>
                )}
                <p className="cart-card__meta">
                  Cantidad: {quantity} · Precio unitario: $
                  {product.price.toFixed(2)}
                </p>
              </div>
            </div>

            <div className="cart-card__right">
              <p className="cart-card__subtotal">
                ${(product.price * quantity).toFixed(2)}
              </p>
              <button
                className="cart-card__remove"
                onClick={() => removeItem(product.id)}
              >
                Quitar
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="cart-summary">
        <div>
          <p>
            Total carrito: <strong>${total.toFixed(2)}</strong>
          </p>
          <p>
            Total seleccionados:{" "}
            <strong>${selectedTotal.toFixed(2)}</strong>
          </p>
        </div>

        <div className="cart-summary__actions">
          <button className="cart-summary__clear" onClick={clearCart}>
            Vaciar carrito
          </button>
          <button
            className="cart-summary__pay"
            disabled={selectedTotal === 0}
            onClick={() => navigate("/payment")}
          >
            Pagar seleccionados
          </button>
        </div>
      </div>
    </AppLayout>
  );
}
