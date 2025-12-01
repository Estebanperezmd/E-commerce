/* eslint-disable react-refresh/only-export-components */

import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const [initialized, setInitialized] = useState(false);

  // Persistir y sincronizar carrito en localStorage y entre pestañas
  useEffect(() => {
    const stored = localStorage.getItem("cart");
    if (stored) {
      try {
        setItems(JSON.parse(stored));
      } catch {
        // ignore
      }
    }
    setInitialized(true);
    // Escuchar cambios en localStorage desde otras pestañas
    const handleStorage = (e) => {
      if (e.key === "cart" && e.newValue) {
        try {
          setItems(JSON.parse(e.newValue));
        } catch {}
      }
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  useEffect(() => {
    if (initialized) {
      localStorage.setItem("cart", JSON.stringify(items));
    }
  }, [items, initialized]);

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

  function clearSelectedItems() {
  setItems((prev) => prev.filter((it) => !it.selected));
}


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
    clearSelectedItems,
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
