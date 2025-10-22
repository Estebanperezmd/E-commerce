const { Router } = require('express');
const ProductController = require('../controllers/ProductController');
const AuthMiddleware = require('../middleware/AuthMiddleware');
const AdminMiddleware = require('../middleware/AdminMiddleware');

const router = Router();

// Rutas públicas
router.get('/', ProductController.findAll);
router.get('/:id', ProductController.findById);

// // Rutas protegidas (solo admin)
// router.post('/', [authMiddleware, adminMiddleware], ProductController.create);
// router.put('/:id', [authMiddleware, adminMiddleware], ProductController.update);
// router.patch('/:id/stock', [authMiddleware, adminMiddleware], ProductController.updateStock);
// router.delete('/:id', [authMiddleware, adminMiddleware], ProductController.delete);

module.exports = router;