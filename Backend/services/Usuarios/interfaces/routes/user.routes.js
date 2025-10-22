const { Router } = require('express');
const UserController = require('../controllers/UserController');
const AuthMiddleware = require('../middleware/AuthMiddleware');

const router = Router();

// Rutas públicas
router.post('/register', UserController.create);
router.post('/login', UserController.login);

// Rutas protegidas
router.get('/profile', AuthMiddleware, UserController.getProfile);
router.put('/profile', AuthMiddleware, UserController.updateProfile);
router.get('/:id', AuthMiddleware, UserController.findById);
router.delete('/:id', AuthMiddleware, UserController.delete);
// // Rutas públicas
// router.post('/register', UserController.create);
// router.post('/login', UserController.login);

// // Rutas protegidas
// router.get('/profile', authMiddleware, UserController.getProfile);
// router.put('/profile', authMiddleware, UserController.updateProfile);
// router.get('/:id', authMiddleware, UserController.findById);
// router.delete('/:id', authMiddleware, UserController.delete);

module.exports = router;