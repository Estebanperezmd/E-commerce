const CreateUser = require('../../application/use-cases/CreateUser');
const ConnectionFactory = require('../../infrastructure/databases/ConnectionFactory');
const UserDTO = require('../dtos/UserDTO');

class UserController {
  static async create(req, res) {
    try {
      const user = await CreateUser.execute(req.body);
      res.status(201).json(new UserDTO(user));
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async findAll(req, res) {
    try {
      const result = await ConnectionFactory.query('SELECT * FROM usuarios', []);
      const users = result.rows.map(row => new UserDTO(row));
      res.status(200).json(users);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
}

module.exports = UserController;
