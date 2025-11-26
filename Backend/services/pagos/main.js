const express = require('express');
const bodyParser = require('body-parser');
const { initDatabase } = require('./infrastructure/databases/ConnectionFactory');
const pagoRoutes = require('./interfaces/routes/payment.routes');

const app = express();
app.use(bodyParser.json());

// rutas del microservicio pagos
app.use('/pagos', pagoRoutes);

const PORT = process.env.PORT || 3006;
app.listen(PORT, async () => {
  await initDatabase();
  console.log(`💰 Microservicio Pagos corriendo en puerto ${PORT}`);
});
