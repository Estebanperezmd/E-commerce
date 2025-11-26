const express = require("express");
const userController = require("./interfaces/controllers/UserController");
const cartController = require("./interfaces/controllers/CartController"); // si existe

const app = express();

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
