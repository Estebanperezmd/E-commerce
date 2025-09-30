const Order = require('../../domain/entities/order');

class CreateOrder {
  execute(cartId) {
    return new Order(cartId);
  }
}

module.exports = CreateOrder;
