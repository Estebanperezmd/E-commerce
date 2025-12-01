const express = require("express");
const cors = require("cors");
const { AppDataSource, initDatabase } = require("./infrastructure/databases/ConnectionFactory");

const app = express();

app.use(cors());
app.use(express.json());

// 🔍 logger global
app.use((req, res, next) => {
  console.log("REQ (CARRO):", req.method, req.url);
  next();
});

// 🔹 GET /ping
app.get("/ping", (req, res) => {
  console.log("👉 GET /ping (CARRO)");
  res.json({ ok: true, msg: "pong desde micro CARRITO" });
});

// 🔹 POST /create → crea un registro real en "Carritos"
app.post("/create", async (req, res) => {
  try {
    console.log("👉 POST /create (CARRO) con body:", req.body);

    const { userId } = req.body || {};

    // 1. Aseguramos conexión
    if (!AppDataSource.isInitialized) {
      await initDatabase();
    }

    const status = "open";

    // ⚠️ OJO: usamos exactamente los nombres de columna de tu tabla:
    // id_carrito, fecha_creacion, status, invitation_link, id_main_user
    const insertQuery = `
      INSERT INTO "Carritos" (fecha_creacion, status, invitation_link, id_main_user)
      VALUES (NOW(), $1, $2, $3)
      RETURNING id_carrito, fecha_creacion, status, invitation_link, id_main_user
    `;

    // De momento insertamos invitation_link como NULL, luego devolvemos el link calculado
    const rows = await AppDataSource.query(insertQuery, [
      status,
      null,            // invitation_link en la BD
      userId || null,  // id_main_user
    ]);

    const row = rows[0];

    // 2. Construimos el link bonito a partir del id_carrito
    const invitation_link = `http://localhost:5173/join/${row.id_carrito}`;

    // (Opcional) si quieres que también quede guardado en la BD, descomenta este bloque:
    /*
    const updateQuery = `
      UPDATE "Carritos"
      SET invitation_link = $1
      WHERE id_carrito = $2
    `;
    await AppDataSource.query(updateQuery, [invitation_link, row.id_carrito]);
    */

    // 3. DTO de respuesta
    const cartDto = {
      id_carrito: row.id_carrito,
      status: row.status,
      fecha_creacion: row.fecha_creacion,
      invitation_link,          // usamos el que calculamos
      id_main_user: row.id_main_user,
    };

    return res.status(201).json(cartDto);
  } catch (err) {
    console.error("Error en /create (CARRO):", err);
    return res
      .status(500)
      .json({ error: "Error creando carrito", details: err.message });
  }
});

// 🔚 Fallback 404
app.use((req, res) => {
  console.log("❌ 404 (CARRO) en", req.method, req.url);
  res.status(404).json({ error: "Not found en micro CARRITO" });
});

const PORT = 3007;

app.listen(PORT, async () => {
  await initDatabase();
  console.log(`🛒 Microservicio Carrito corriendo en puerto ${PORT}`);
});
