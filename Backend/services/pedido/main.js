const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const orderRoutes = require("./interfaces/routes/orderRoutes");
const { initDatabase } = require("./infrastructure/databases/ConnectionFactory");

const app = express();
app.use(cors());           // 👈 NECESARIO
app.use(bodyParser.json());

app.use("/pedidos", orderRoutes);

const PORT = process.env.PORT || 3006;

app.listen(PORT, async () => {
  await initDatabase();
  console.log(`🧾 Microservicio PEDIDOS corriendo en puerto ${PORT}`);
});
