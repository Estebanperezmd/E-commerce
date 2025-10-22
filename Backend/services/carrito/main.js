import express from 'express';
import bodyParser from 'body-parser';
import { createConnection } from './infrastructure/databases/connection.js';
import { CarritoController } from './interfaces/controllers/CarritoController.js';

const app = express();
app.use(bodyParser.json());

// rutas del microservicio carrito
const carritoController = new CarritoController();
app.use('/carrito', carritoController.router);

const PORT = process.env.PORT || 3003;
app.listen(PORT, async () => {
  await createConnection();
  console.log(`🛍️ Microservicio Carrito corriendo en puerto ${PORT}`);
});
