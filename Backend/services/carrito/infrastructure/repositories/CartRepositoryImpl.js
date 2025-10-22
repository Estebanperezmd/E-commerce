const { AppDataSource } = require('../../../pedido/infrastructure/databases/ConnectionFactory');
const Cart = require('../../domain/entities/Cart');
const CartDetail = require('../../domain/entities/CartDetail');

class CartRepositoryImpl {
  constructor() {
    this.repository = AppDataSource.getRepository(Cart);
    this.detailRepository = AppDataSource.getRepository(CartDetail);
  }

  async createCart() {
    const cart = this.repository.create({
      estado: 'open',
      fecha_creacion: new Date(),
    });
    return await this.repository.save(cart);
  }

  async addProductToCart({ id_carrito, id_producto, cantidad, id_usuario }) {
    const detail = this.detailRepository.create({
      id_carrito,
      id_producto,
      cantidad,
      id_usuario,
      confirmado: false,
    });
    return await this.detailRepository.save(detail);
  }

  async findCartById(id) {
    return await this.repository.findOne({
      where: { id },
      relations: ['detalles'],
    });
  }
}

module.exports = CartRepositoryImpl;
