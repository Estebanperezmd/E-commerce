const express = require('express');
const bodyParser = require('body-parser');
const { initDatabase } = require('./infrastructure/databases/ConnectionFactory');
const ProductRoute = require('./interfaces/routes/product.routes');

const app = express();
app.use(bodyParser.json());

// rutas del microservicio productos

app.use('/productos', ProductRoute);

const PORT = process.env.PORT || 3005;
app.listen(PORT, async () => {
  await initDatabase();
  console.log(`🧾 Microservicio Productos corriendo en puerto ${PORT}`);
});
