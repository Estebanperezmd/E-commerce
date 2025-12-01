const express = require("express");
const cors = require("cors");

const userRoutes = require("./interfaces/routes/user.routes");  
const cartRoutes = require("./interfaces/routes/cartRoutes");
const { initDatabase } = require("./infrastructure/databases/ConnectionFactory");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/usuarios", userRoutes);
app.use("/carritos", cartRoutes);

const PORT = process.env.PORT || 3002;

app.listen(PORT, async () => {
  await initDatabase();
  console.log(`Microservicio Usuarios corriendo en puerto ${PORT}`);
});
