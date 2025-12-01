import { useNavigate } from "react-router-dom";
import { useCart } from "../../app/CartContext";
import AppLayout from "../components/AppLayout";
import "./PaymentPage.css";
import { useState } from "react";
import { useAuth } from "../../app/AuthContext";

const PEDIDOS_BASE_URL = "http://localhost:3006";

export default function PaymentPage() {
  const { items, selectedTotal, clearSelectedItems  } = useCart();
  const navigate = useNavigate();
  const selectedItems = items.filter((it) => it.selected);

  const { auth } = useAuth();
  const currentUser = auth?.user || null;
  const userId = currentUser?.id || 1; // fallback mientras tanto

  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCVV, setCardCVV] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [error, setError] = useState("");

  // --------- HANDLERS DE INPUT (sanitizar) ---------

  // Solo números, hasta 16 dígitos
  const handleCardNumberChange = (e) => {
    const onlyDigits = e.target.value.replace(/\D/g, "").slice(0, 16);
    setCardNumber(onlyDigits);
  };

  // Solo letras y espacios
  const handleCardNameChange = (e) => {
    const onlyLetters = e.target.value
      .replace(/[^A-Za-zÁÉÍÓÚáéíóúÑñ\s]/g, "")
      .slice(0, 40);
    setCardName(onlyLetters);
  };

  // MM/AA: se auto-formatea
  const handleCardExpiryChange = (e) => {
    let value = e.target.value.replace(/\D/g, "").slice(0, 4); // solo 4 números

    if (value.length >= 3) {
      value = value.slice(0, 2) + "/" + value.slice(2);
    }

    setCardExpiry(value);
  };

  // Solo 3 dígitos
  const handleCardCVVChange = (e) => {
    const onlyDigits = e.target.value.replace(/\D/g, "").slice(0, 3);
    setCardCVV(onlyDigits);
  };

  // --------- VALIDACIONES ---------

  const isCardNumberValid = cardNumber.length === 16;
  const isNameValid = cardName.trim().length > 0;
  const isExpiryValid = /^((0[1-9])|(1[0-2]))\/\d{2}$/.test(cardExpiry);
  const isCVVValid = cardCVV.length === 3;

  const isFormValid =
    isCardNumberValid && isNameValid && isExpiryValid && isCVVValid;

  // --------- CONFIRMAR PAGO ---------

  const handleConfirm = async () => {
    // si está procesando o el formulario es inválido, no hacemos nada
    if (isProcessing || !isFormValid) return;

    setIsProcessing(true);
    setError("");

    try {
      const paymentInfo = {
        last4: cardNumber.slice(-4),
        cardName: cardName || null,
        cardExpiry: cardExpiry || null,
      };

      const res = await fetch(`${PEDIDOS_BASE_URL}/pedidos`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          idUsuario: userId,
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
          /* ignore */
        }
        throw new Error(msg);
      }

      const order = await res.json();
      console.log("✅ Pedido creado:", order);

      clearSelectedItems ();
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

  // --------- RENDERS ---------

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
          value={cardNumber}
          onChange={handleCardNumberChange}
        />
        <input
          type="text"
          placeholder="Nombre en la tarjeta"
          value={cardName}
          onChange={handleCardNameChange}
        />
        <div className="payment-card-form__row">
          <input
            type="text"
            placeholder="MM/AA"
            value={cardExpiry}
            onChange={handleCardExpiryChange}
          />
          <input
            type="text"
            placeholder="CVV"
            value={cardCVV}
            onChange={handleCardCVVChange}
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
          disabled={isProcessing || !isFormValid}
        >
          {isProcessing ? "Procesando..." : "Confirmar pago"}
        </button>
      </div>
    </AppLayout>
  );
}
