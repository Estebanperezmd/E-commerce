const request = require('supertest');
const app = require('../../app');
const ProductService = require('../../application/services/ProductService');
const UserService = require('../../../Usuarios/application/services/UserService');
const { expect } = require('chai');

describe('Product Integration Tests', () => {
  let testProduct;
  let adminToken;

  before(async () => {
    // Crear admin para pruebas
    const admin = await UserService.createUser({
      nombre: 'Admin',
      email: 'admin@example.com',
      password: 'Admin123!',
      rol: 'admin'
    });

    const authResult = await UserService.authenticate('admin@example.com', 'Admin123!');
    adminToken = authResult.token;

    // Crear producto de prueba
    testProduct = await ProductService.createProduct({
      nombre: 'Test Product',
      descripcion: 'Test Description',
      precio: 99.99,
      stock: 10,
      categoria: 'test'
    });
  });

  describe('Product Operations', () => {
    it('should get all products', async () => {
      const res = await request(app)
        .get('/api/products');

      expect(res.status).to.equal(200);
      expect(res.body).to.be.an('array');
    });

    it('should get product by id', async () => {
      const res = await request(app)
        .get(`/api/products/${testProduct.id}`);

      expect(res.status).to.equal(200);
      expect(res.body).to.have.property('nombre', 'Test Product');
    });

    it('should create product with admin token', async () => {
      const res = await request(app)
        .post('/api/products')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          nombre: 'New Product',
          descripcion: 'New Description',
          precio: 149.99,
          stock: 5,
          categoria: 'test'
        });

      expect(res.status).to.equal(201);
      expect(res.body).to.have.property('nombre', 'New Product');
    });

    it('should update product with admin token', async () => {
      const res = await request(app)
        .put(`/api/products/${testProduct.id}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          precio: 109.99
        });

      expect(res.status).to.equal(200);
      expect(res.body).to.have.property('precio', 109.99);
    });

    it('should update product stock with admin token', async () => {
      const res = await request(app)
        .patch(`/api/products/${testProduct.id}/stock`)
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          quantity: -2
        });

      expect(res.status).to.equal(200);
      expect(res.body).to.have.property('stock', 8);
    });
  });

  after(async () => {
    // Limpiar datos de prueba
    await ProductService.deleteProduct(testProduct.id);
  });
});