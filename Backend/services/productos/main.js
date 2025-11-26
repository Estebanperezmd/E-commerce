const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { initDatabase } = require("./infrastructure/databases/ConnectionFactory");

const ProductRoute = require("./interfaces/routes/product.routes");
const CityRoute = require("./interfaces/routes/City.routes");
const RestaurantRoute = require("./interfaces/routes/Restaurant.routes");

const app = express();
app.use(bodyParser.json());
app.use(cors());
// rutas del microservicio catálogo
app.use("/productos", ProductRoute);
app.use("/ciudades", CityRoute);
app.use("/restaurantes", RestaurantRoute);

const PORT = process.env.PORT || 3005;

app.listen(PORT, async () => {
  await initDatabase();
  console.log(`🧾 Microservicio Catálogo en puerto ${PORT}`);
});
