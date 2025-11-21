const { Router } = require('express');
const ProductController = require('../controllers/ProductController');
// const AuthMiddleware = require('../middleware/AuthMiddleware');
// const AdminMiddleware = require('../middleware/AdminMiddleware');

const router = Router();

// Crear instancia del controlador
const controller = new ProductController();

// Rutas públicas
router.get('/', controller.getAllProducts.bind(controller));
router.get('/:id', controller.getProduct.bind(controller));

// // Rutas protegidas (solo admin) - cuando las uses, ojo con los nombres de los middlewares
// router.post('/', [AuthMiddleware, AdminMiddleware], controller.createProduct.bind(controller));
// router.put('/:id', [AuthMiddleware, AdminMiddleware], controller.updateProduct.bind(controller));
// router.patch('/:id/stock', [AuthMiddleware, AdminMiddleware], controller.updateStock.bind(controller));
// router.delete('/:id', [AuthMiddleware, AdminMiddleware], controller.deleteProduct.bind(controller));

module.exports = router;
