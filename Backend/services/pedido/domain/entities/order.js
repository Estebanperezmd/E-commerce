class Order {
  static counter = 1;

  constructor(cartId) {
    this.id = Order.counter++;
    this.cartId = cartId;
    this.createdAt = new Date();
    this.status = 'pending';
  }
}

module.exports = Order;
