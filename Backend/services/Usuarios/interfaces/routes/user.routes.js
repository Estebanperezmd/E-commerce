const { Router } = require('express');
const UserController = require('../controllers/UserController');
const AuthMiddleware = require('../middleware/AuthMiddleware');

const router = Router();
const userController = new UserController(); 
// Rutas públicas
router.post('/register', (req, res) => userController.create(req, res));
router.post('/login', (req, res) => userController.login(req, res));

// Rutas protegidas
router.get('/profile', AuthMiddleware, (req, res) => userController.getProfile(req, res));
router.put('/profile', AuthMiddleware, (req, res) => userController.updateProfile(req, res));
router.get('/:id', AuthMiddleware, (req, res) => userController.findById(req, res));
router.delete('/:id', AuthMiddleware, (req, res) => userController.delete(req, res));

module.exports = router;
