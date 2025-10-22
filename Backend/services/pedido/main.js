const express = require('express');
const bodyParser = require('body-parser');
const { initDatabase } = require('./infrastructure/databases/ConnectionFactory');
const orderRoutes = require('./interfaces/routes/OrderRoutes');

const app = express();
app.use(bodyParser.json());
app.use('/pedidos', orderRoutes);

const PORT = process.env.PORT || 3004;
app.listen(PORT, async () => {
  await initDatabase();
  console.log(`📦 Microservicio Pedidos corriendo en puerto ${PORT}`);
});
