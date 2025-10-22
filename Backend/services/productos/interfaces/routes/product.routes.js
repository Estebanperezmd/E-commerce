const { Router } = require('express');
const ProductController = require('../controllers/ProductController');
const authMiddleware = require('../middleware/authMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');

const router = Router();

// Rutas públicas
router.get('/', ProductController.findAll);
router.get('/:id', ProductController.findById);

// Rutas protegidas (solo admin)
router.post('/', [authMiddleware, adminMiddleware], ProductController.create);
router.put('/:id', [authMiddleware, adminMiddleware], ProductController.update);
router.patch('/:id/stock', [authMiddleware, adminMiddleware], ProductController.updateStock);
router.delete('/:id', [authMiddleware, adminMiddleware], ProductController.delete);

module.exports = router;