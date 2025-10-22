import express from 'express';
import bodyParser from 'body-parser';
import { createConnection } from './infrastructure/databases/connection.js';
import { ProductoController } from './interfaces/controllers/ProductoController.js';

const app = express();
app.use(bodyParser.json());

// rutas del microservicio productos
const productoController = new ProductoController();
app.use('/productos', productoController.router);

const PORT = process.env.PORT || 3005;
app.listen(PORT, async () => {
  await createConnection();
  console.log(`🧾 Microservicio Productos corriendo en puerto ${PORT}`);
});
