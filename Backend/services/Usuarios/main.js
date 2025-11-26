const express = require("express");
const cors = require("cors");  // 👈 NUEVO

const userController = require("./interfaces/controllers/UserController");
const cartController = require("./interfaces/controllers/CartController"); // si existe

const app = express();

// Habilitar CORS para el frontend (puedes dejarlo abierto)
app.use(cors()); // o: app.use(cors({ origin: "http://localhost:5173" }));

// Para permitir JSON en las peticiones
app.use(express.json());

// Rutas del microservicio Usuarios
app.use("/usuarios", userController);

// Si el microservicio maneja carritos también:
app.use("/carrito", cartController);  // opcional

// Puerto del microservicio
const PORT = process.env.PORT || 3002;

app.listen(PORT, () => {
  console.log(`Microservicio Usuarios corriendo en puerto ${PORT}`);
});
