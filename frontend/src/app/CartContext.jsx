/* eslint-disable react-refresh/only-export-components */

import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);

  // Opcional: persistir en localStorage
  useEffect(() => {
    const stored = localStorage.getItem("cart");
    if (stored) {
      try {
        setItems(JSON.parse(stored));
      } catch {
        // ignore
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(items));
  }, [items]);

  // Añadir producto (si ya existe, aumenta cantidad)
  const addItem = (product, restaurant) => {
    setItems((prev) => {
      const existing = prev.find((it) => it.product.id === product.id);
      if (existing) {
        return prev.map((it) =>
          it.product.id === product.id
            ? { ...it, quantity: it.quantity + 1 }
            : it
        );
      }
      return [
        ...prev,
        {
          product,
          restaurant: restaurant ?? null,
          quantity: 1,
          selected: true, // por defecto marcado para pagar
        },
      ];
    });
  };

  const toggleSelect = (productId) => {
    setItems((prev) =>
      prev.map((it) =>
        it.product.id === productId
          ? { ...it, selected: !it.selected }
          : it
      )
    );
  };

  const removeItem = (productId) => {
    setItems((prev) => prev.filter((it) => it.product.id !== productId));
  };

  const clearCart = () => setItems([]);

  const total = items.reduce(
    (sum, it) => sum + it.product.price * it.quantity,
    0
  );

  const selectedTotal = items
    .filter((it) => it.selected)
    .reduce((sum, it) => sum + it.product.price * it.quantity, 0);

  const value = {
    items,
    addItem,
    toggleSelect,
    removeItem,
    clearCart,
    total,
    selectedTotal,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart debe usarse dentro de un CartProvider");
  }
  return ctx;
}
