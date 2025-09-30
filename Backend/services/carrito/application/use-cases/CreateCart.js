const Cart = require('../../domain/entities/Cart');

class CreateCart {
  execute() {
    return new Cart();
  }
}

module.exports = CreateCart;
