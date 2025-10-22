const axios = require('axios');

class ProductServiceClient {
  constructor() {
    this.baseURL = process.env.PRODUCTOS_SERVICE_URL || 'http://localhost:3001';
  }

  async findProductById(id) {
    try {
      const response = await axios.get(`${this.baseURL}/api/products/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(`Error comunicando con servicio de productos: ${error.message}`);
    }
  }

  async updateProductStock(id, quantity) {
    try {
      const response = await axios.patch(`${this.baseURL}/api/products/${id}/stock`, { quantity });
      return response.data;
    } catch (error) {
      throw new Error(`Error actualizando stock: ${error.message}`);
    }
  }
}

module.exports = ProductServiceClient;