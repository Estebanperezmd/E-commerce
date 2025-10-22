class OrderService {
  constructor(orderRepository) {
    this.orderRepository = orderRepository;
  }

  async createOrder(id_carrito) {
    return await this.orderRepository.createOrder(id_carrito);
  }

  async listOrders() {
    return await this.orderRepository.findAllOrders();
  }

  async getOrderById(id) {
    return await this.orderRepository.findOrderById(id);
  }
}

module.exports = OrderService;
