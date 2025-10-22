const UserService = require('../../application/services/UserService');

class AuthMiddleware {
  constructor(userService = new UserService()) {
    this.userService = userService;
  }

  authenticate = async (req, res, next) => {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Token no proporcionado' });
      }

      const token = authHeader.split(' ')[1];
      const user = await this.userService.verifyToken(token);
      
      req.user = user;
      next();
    } catch (error) {
      res.status(401).json({ error: 'Token inválido' });
    }
  };

  isAdmin = async (req, res, next) => {
    try {
      if (!req.user || !req.user.isAdmin()) {
        return res.status(403).json({ error: 'Acceso denegado' });
      }
      next();
    } catch (error) {
      res.status(403).json({ error: 'Acceso denegado' });
    }
  };
}

module.exports = AuthMiddleware;