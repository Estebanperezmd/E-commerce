import { useNavigate } from "react-router-dom";
import { useCart } from "../../app/CartContext";
import AppLayout from "../components/AppLayout";
import "./PaymentPage.css";
import { useState } from "react";
import { useAuth } from "../../app/AuthContext";   // 👈 NUEVO

// Usa la URL pública de ngrok para producción
const PEDIDOS_BASE_URL = "https://leda-proalien-kiersten.ngrok-free.dev";

export default function PaymentPage() {
  const { items, selectedTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const selectedItems = items.filter((it) => it.selected);

  const { auth } = useAuth();              // 👈 obtenemos user del contexto
  const currentUser = auth?.user || null;  // puede ser null si no hay login
  const userId = currentUser?.id || 1;     // fallback a 1 para pruebas

  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCVV, setCardCVV] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [error, setError] = useState("");

  const handleConfirm = async () => {
    if (isProcessing) return;

    setIsProcessing(true);
    setError("");

    try {
      const paymentInfo = {
        last4: cardNumber.slice(-4),
        cardName: cardName || null,
        cardExpiry: cardExpiry || null,
      };

      const res = await fetch(`${PEDIDOS_BASE_URL}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          idUsuario: userId,                // 👈 ahora sale del contexto
          totalAmount: Number(selectedTotal),
          paymentInfo,
        }),
      });

      if (!res.ok) {
        let msg = "Error creando el pedido";
        try {
          const data = await res.json();
          msg = data.error || data.message || msg;
        } catch {
          // ignoramos error al parsear JSON
        }
        throw new Error(msg);
      }

      const order = await res.json();
      console.log("✅ Pedido creado:", order);

      clearCart();
      setShowConfirmation(true);

      setTimeout(() => {
        navigate("/home");
      }, 2000);
    } catch (err) {
      console.error(err);
      setError(err.message || "Ocurrió un error procesando el pago");
    } finally {
      setIsProcessing(false);
    }
  };

  if (selectedItems.length === 0 && !showConfirmation) {
    return (
      <AppLayout title="Pago" subtitle="">
        <p>No hay productos seleccionados para pagar.</p>
      </AppLayout>
    );
  }

  if (showConfirmation) {
    return (
      <AppLayout
        title="¡Gracias por tu compra!"
        subtitle="Tu pedido está en camino."
      >
        <div className="confirmation-checkmark">✔</div>
      </AppLayout>
    );
  }

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
              {(product.price * quantity).toFixed(2)}
            </div>
          </li>
        ))}
      </ul>

      <div className="payment-card-form">
        <h3>Información de tarjeta</h3>
        <input
          type="text"
          placeholder="Número de tarjeta"
          maxLength={19}
          value={cardNumber}
          onChange={(e) => setCardNumber(e.target.value)}
        />
        <input
          type="text"
          placeholder="Nombre en la tarjeta"
          value={cardName}
          onChange={(e) => setCardName(e.target.value)}
        />
        <div className="payment-card-form__row">
          <input
            type="text"
            placeholder="MM/AA"
            maxLength={5}
            value={cardExpiry}
            onChange={(e) => setCardExpiry(e.target.value)}
          />
          <input
            type="text"
            placeholder="CVV"
            maxLength={4}
            value={cardCVV}
            onChange={(e) => setCardCVV(e.target.value)}
          />
        </div>
      </div>

      <div className="payment-summary">
        <p>
          Total a pagar: <strong>${selectedTotal.toFixed(2)}</strong>
        </p>

        {error && (
          <p className="payment-error" style={{ textAlign: "right" }}>
            {error}
          </p>
        )}

        {isProcessing && (
          <p style={{ textAlign: "right", marginTop: "0.5rem", color: "#888" }}>
            Enviando pedido...
          </p>
        )}

        <button
          className="payment-confirm"
          onClick={handleConfirm}
          disabled={isProcessing}
        >
          {isProcessing ? "Procesando..." : "Confirmar pago"}
        </button>
      </div>
    </AppLayout>
  );
}
