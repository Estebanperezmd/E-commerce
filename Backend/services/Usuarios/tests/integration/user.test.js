const request = require('supertest');
const app = require('../../app');
const UserService = require('../../application/services/UserService');
const { expect } = require('chai');

describe('User Integration Tests', () => {
  let testUser;
  let authToken;

  before(async () => {
    // Crear usuario de prueba
    testUser = await UserService.createUser({
      nombre: 'Test User',
      email: 'test@example.com',
      password: 'Test123!'
    });
  });

  describe('Authentication', () => {
    it('should login successfully with valid credentials', async () => {
      const res = await request(app)
        .post('/api/users/login')
        .send({
          email: 'test@example.com',
          password: 'Test123!'
        });

      expect(res.status).to.equal(200);
      expect(res.body).to.have.property('token');
      authToken = res.body.token;
    });

    it('should fail login with invalid credentials', async () => {
      const res = await request(app)
        .post('/api/users/login')
        .send({
          email: 'test@example.com',
          password: 'wrongpassword'
        });

      expect(res.status).to.equal(401);
    });
  });

  describe('User Operations', () => {
    it('should get user profile with valid token', async () => {
      const res = await request(app)
        .get('/api/users/profile')
        .set('Authorization', `Bearer ${authToken}`);

      expect(res.status).to.equal(200);
      expect(res.body).to.have.property('email', 'test@example.com');
    });

    it('should update user profile with valid token', async () => {
      const res = await request(app)
        .put('/api/users/profile')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          nombre: 'Updated Name'
        });

      expect(res.status).to.equal(200);
      expect(res.body).to.have.property('nombre', 'Updated Name');
    });
  });

  after(async () => {
    // Limpiar datos de prueba
    await UserService.deleteUser(testUser.id);
  });
});