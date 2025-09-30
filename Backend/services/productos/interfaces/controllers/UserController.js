const CreateUser = require('../../application/use-cases/CreateUser');
const ConnectionFactory = require('../../infrastructure/databases/ConnectionFactory');
const UserDTO = require('../dtos/UserDTO');

class UserController {
  static async create(req, res) {
    try {
      const { nombre, email, password, direccion } = req.body;
      const user = await CreateUser.execute({ nombre, email, password, direccion });
      res.status(201).json(new UserDTO(user));
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async findAll(req, res) {
    try {
      const result = await ConnectionFactory.query('SELECT id, nombre, email, direccion FROM usuarios', []);
      const users = result.rows.map(r => new UserDTO(r));
      res.status(200).json(users);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
}

module.exports = UserController;
