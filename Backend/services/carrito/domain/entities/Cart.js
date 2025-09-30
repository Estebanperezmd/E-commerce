const Cart = require('./Cart');

class CreateCart {
  execute() {
    return new Cart();
  }
}

module.exports = CreateCart;