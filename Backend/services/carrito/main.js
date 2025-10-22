const express = require('express');
const bodyParser = require('body-parser');
const { initDatabase } = require('./infrastructure/databases/ConnectionFactory');
const CartController = require('./interfaces/controllers/CartController');

const app = express();
app.use(bodyParser.json());


app.post('/carrito', CartController.addProduct);
app.get('/carrito/:idUsuario', CartController.getCartByUser);

const PORT = process.env.PORT || 3003;
app.listen(PORT, async() => {
  await initDatabase();
  console.log(`🛍️ Microservicio Carrito corriendo en puerto ${PORT}`);
});