const CreateProduct = require('../../application/use-cases/CreateProduct');
const ProductRepository = require('../../infrastructure/repositories/ProductRepositoryImpl');
const ProductDTO = require('../dtos/ProductDTO');

class ProductController {
  constructor() {
    this.productRepository = new ProductRepository();
    this.createProductUseCase = new CreateProduct(this.productRepository);
  }

  async createProduct(req, res) {
    try {
      // Verificar si el usuario es admin
      if (!req.user.isAdmin()) {
        return res.status(403).json({ error: 'No autorizado' });
      }

      const productData = ProductDTO.fromDTO(req.body);
      const product = await this.createProductUseCase.execute(productData);
      res.status(201).json(ProductDTO.toDTO(product));
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async getProduct(req, res) {
    try {
      const product = await this.productRepository.findById(req.params.id);
      if (!product) {
        return res.status(404).json({ error: 'Producto no encontrado' });
      }
      res.json(ProductDTO.toDTO(product));
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getAllProducts(req, res) {
    try {
      const filters = {
        categoria: req.query.categoria,
        precioMin: req.query.precioMin ? parseFloat(req.query.precioMin) : undefined,
        precioMax: req.query.precioMax ? parseFloat(req.query.precioMax) : undefined,
        stockMin: req.query.stockMin ? parseInt(req.query.stockMin) : undefined
      };

      const products = await this.productRepository.findAll(filters);
      res.json(products.map(product => ProductDTO.toDTO(product)));
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async updateProduct(req, res) {
    try {
      // Verificar si el usuario es admin
      if (!req.user.isAdmin()) {
        return res.status(403).json({ error: 'No autorizado' });
      }

      const productData = ProductDTO.fromDTO(req.body);
      const product = await this.productRepository.update(req.params.id, productData);
      res.json(ProductDTO.toDTO(product));
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async deleteProduct(req, res) {
    try {
      // Verificar si el usuario es admin
      if (!req.user.isAdmin()) {
        return res.status(403).json({ error: 'No autorizado' });
      }

      await this.productRepository.delete(req.params.id);
      res.status(204).send();
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async updateStock(req, res) {
    try {
      // Verificar si el usuario es admin
      if (!req.user.isAdmin()) {
        return res.status(403).json({ error: 'No autorizado' });
      }

      const { quantity } = req.body;
      const product = await this.productRepository.updateStock(req.params.id, quantity);
      res.json(ProductDTO.toDTO(product));
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async getByCategoria(req, res) {
    try {
      const products = await this.productRepository.findByCategoria(req.params.categoria);
      res.json(products.map(product => ProductDTO.toDTO(product)));
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async checkStock(req, res) {
    try {
      const hasStock = await this.productRepository.hasStock(req.params.id, req.query.quantity);
      res.json({ hasStock });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

module.exports = ProductController;