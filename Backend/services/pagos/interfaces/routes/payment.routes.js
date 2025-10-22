const { Router } = require('express');
const PagoController = require('../controllers/PagoController');

const router = Router();
const pagoController = new PagoController();

// Nota: eliminamos el prefijo '/pagos' porque ya lo define el main.js
router.post('/', (req, res) => pagoController.createPago(req, res));
router.get('/:id', (req, res) => pagoController.getPagoById(req, res));
router.get('/', (req, res) => pagoController.getAllPagos(req, res));

module.exports = router;
