const { Controller, Get, Post } = require('@nestjs/common');
const CreateCart = require('../../application/use-cases/CreateCart');
const CartDTO = require('../dtos/CartDTO');

class CartController {
  constructor() {
    this.createCart = new CreateCart();
    this.carts = [];
  }

  create() {
    const newCart = this.createCart.execute();
    this.carts.push(newCart);
    return new CartDTO(newCart.id, newCart.createdAt, newCart.status);
  }

  findAll() {
    return this.carts.map(
      (cart) => new CartDTO(cart.id, cart.createdAt, cart.status)
    );
  }
}

Post()(CartController.prototype, 'create', Object.getOwnPropertyDescriptor(CartController.prototype, 'create'));
Get()(CartController.prototype, 'findAll', Object.getOwnPropertyDescriptor(CartController.prototype, 'findAll'));
Controller('carts')(CartController);

module.exports = { CartController };
