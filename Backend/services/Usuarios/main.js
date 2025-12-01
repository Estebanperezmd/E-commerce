const express = require("express");
const cors = require("cors");
const { initDatabase } = require("./infrastructure/databases/ConnectionFactory");
const userRoutes = require("./interfaces/routes/user.routes"); // 👈 fíjate en el nombre del archivo

const app = express();

app.use(cors());
app.use(express.json());

// Rutas del micro de usuarios
app.use("/usuarios", userRoutes);

const PORT = process.env.PORT || 3002;

app.listen(PORT, async () => {
  await initDatabase();
  console.log(`👤 Microservicio Usuarios corriendo en puerto ${PORT}`);
});
