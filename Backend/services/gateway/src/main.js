const express = require('express');
const bodyParser = require('body-parser');
const gatewayRoutes = require('./gateway.controller');

const app = express();
app.use(bodyParser.json());
app.use('/', gatewayRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Gateway corriendo en puerto ${PORT}`));
