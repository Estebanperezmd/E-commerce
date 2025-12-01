// interfaces/routes/CartRoutes.js
const express = require("express");
const router = express.Router();

// para comprobar que el archivo se carga
console.log("✅ CartRoutes cargado");

// GET simple para probar en el navegador
router.get("/ping", (req, res) => {
  console.log("👉 GET /ping");
  res.json({ ok: true, msg: "pong" });
});

/**
 * POST /create  → endpoint de prueba para crear carrito
 */
router.post("/create", async (req, res) => {
  try {
    console.log("👉 POST /create con body:", req.body);

    const fakeCart = {
      id_carrito: 1,
      status: "open",
      fecha_creacion: new Date().toISOString(),
      invitation_link: "http://localhost:5173/join/1",
      id_main_user: null,
    };

    return res.status(201).json(fakeCart);
  } catch (err) {
    console.error("Error en /create:", err);
    return res.status(500).json({ error: "Error creando carrito" });
  }
});

module.exports = router;
