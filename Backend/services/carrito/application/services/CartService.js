class CartService {
  constructor(cartRepository) {
    this.cartRepository = cartRepository;
  }

  async createCart() {
    return await this.cartRepository.createCart();
  }

  async addProduct(data) {
    return await this.cartRepository.addProductToCart(data);
  }

  async getCart(id) {
    return await this.cartRepository.findCartById(id);
  }
}

module.exports = CartService;
