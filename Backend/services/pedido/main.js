import express from 'express';
import bodyParser from 'body-parser';
import { createConnection } from './infrastructure/databases/connection.js';
import { PedidoController } from './interfaces/controllers/PedidoController.js';

const app = express();
app.use(bodyParser.json());

// rutas del microservicio pedido
const pedidoController = new PedidoController();
app.use('/pedidos', pedidoController.router);

const PORT = process.env.PORT || 3004;
app.listen(PORT, async () => {
  await createConnection();
  console.log(`📦 Microservicio Pedido corriendo en puerto ${PORT}`);
});
