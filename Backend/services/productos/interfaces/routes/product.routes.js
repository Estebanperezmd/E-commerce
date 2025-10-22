const { Router } = require('express');
const ProductController = require('../controllers/ProductController');
// const authMiddleware = require('../middleware/authMiddleware');
// const adminMiddleware = require('../middleware/adminMiddleware');

const router = Router();

// rutas públicas
router.get('/', (req, res) => productController.getAllProducts(req, res));
router.get('/:id', (req, res) => productController.getProduct(req, res));

// // Rutas protegidas (solo admin)
// router.post('/', [authMiddleware, adminMiddleware], ProductController.create);
// router.put('/:id', [authMiddleware, adminMiddleware], ProductController.update);
// router.patch('/:id/stock', [authMiddleware, adminMiddleware], ProductController.updateStock);
// router.delete('/:id', [authMiddleware, adminMiddleware], ProductController.delete);

module.exports = router;