import express from 'express';
import bodyParser from 'body-parser';
import { createConnection } from './infrastructure/databases/connection.js';
import { UsuarioController } from './interfaces/controllers/UsuarioController.js';

const app = express();
app.use(bodyParser.json());

// Rutas principales del microservicio Usuarios
const usuarioController = new UsuarioController();
app.use('/usuarios', usuarioController.router);

// Puerto por defecto (3002, igual al docker-compose)
const PORT = process.env.PORT || 3002;

app.listen(PORT, async () => {
  await createConnection();
  console.log(`👤 Microservicio Usuarios corriendo en puerto ${PORT}`);
});
