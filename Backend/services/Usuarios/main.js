const express = require('express');
const bodyParser = require('body-parser');
const { initDatabase } = require ('./infrastructure/databases/ConnectionFactory.js');
const UserRoute = require('./interfaces/routes/user.routes');

const app = express();
app.use(bodyParser.json());

// Rutas principales del microservicio Usuarios
app.use('/usuarios', UserRoute);

// Puerto por defecto (3002, igual al docker-compose)
const PORT = process.env.PORT || 3002;

app.listen(PORT, async () => {
  await initDatabase();
  console.log(`👤 Microservicio Usuarios corriendo en puerto ${PORT}`);
});
