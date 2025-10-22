const { Router } = require('express');
const PaymentController = require('../controllers/PagoController');

const router = Router();

router.post('/pagos', PaymentController.createPago);
router.get('/pagos/:id', PaymentController.getPagoById);
router.get('/pagos', PaymentController.getAllPagos);

module.exports = router;