const { AppDataSource } = require('../../infrastructure/databases/ConnectionFactory');
const Cart = require('../../domain/entities/Cart');

class CreateCart {
  static async execute() {
    try {
      const repo = AppDataSource.getRepository(Cart);
      const newCart = repo.create({
        fecha_creacion: new Date(),
        estado: 'open',
        link_invitacion: null,
      });

      const savedCart = await repo.save(newCart);
      return savedCart;
    } catch (err) {
      console.error('Error creating cart:', err);
      throw err;
    }
  }
}

module.exports = CreateCart;
