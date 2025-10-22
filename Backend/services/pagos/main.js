import express from 'express';
import bodyParser from 'body-parser';
import { createConnection } from './infrastructure/databases/ConnectionFactory.js';
import { PagoController } from './interfaces/controllers/PagoController.js';

const app = express();
app.use(bodyParser.json());

// rutas del microservicio pagos
const pagoController = new PagoController();
app.use('/pagos', pagoController.router);

const PORT = process.env.PORT || 3001;
app.listen(PORT, async () => {
  await createConnection();
  console.log(`💰 Microservicio Pagos corriendo en puerto ${PORT}`);
});
