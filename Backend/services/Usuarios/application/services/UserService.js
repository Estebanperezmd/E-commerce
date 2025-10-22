const IUserService = require('../../domain/interfaces/IUserService');
const UserRepository = require('../../infrastructure/repositories/UserRepositoryImpl');
const User = require('../../domain/entities/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class UserService extends IUserService {
  constructor(userRepository = new UserRepository()) {
    super();
    this.userRepository = userRepository;
    this.JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
  }

  async createUser(userData) {
    try {
      // Validar datos
      if (!User.validateEmail(userData.email)) {
        throw new Error('Email inválido');
      }
      if (!User.validatePassword(userData.password)) {
        throw new Error('La contraseña debe tener al menos 6 caracteres, una mayúscula, una minúscula y un número');
      }

      // Hashear password
      const hashedPassword = await bcrypt.hash(userData.password, 10);
      userData.password = hashedPassword;

      // Crear usuario
      const user = new User(
        null,
        userData.nombre,
        userData.email,
        hashedPassword,
        userData.rol
      );

      return await this.userRepository.create(user);
    } catch (error) {
      throw new Error(`Error al crear usuario: ${error.message}`);
    }
  }

  async getUserById(id) {
    try {
      const user = await this.userRepository.findById(id);
      if (!user) {
        throw new Error('Usuario no encontrado');
      }
      return user;
    } catch (error) {
      throw new Error(`Error al obtener usuario: ${error.message}`);
    }
  }

  async updateUser(id, userData) {
    try {
      const existingUser = await this.getUserById(id);
      
      if (userData.password) {
        if (!User.validatePassword(userData.password)) {
          throw new Error('La contraseña debe tener al menos 6 caracteres, una mayúscula, una minúscula y un número');
        }
        userData.password = await bcrypt.hash(userData.password, 10);
      }

      return await this.userRepository.update(id, {
        ...existingUser,
        ...userData
      });
    } catch (error) {
      throw new Error(`Error al actualizar usuario: ${error.message}`);
    }
  }

  async deleteUser(id) {
    try {
      await this.getUserById(id);
      return await this.userRepository.delete(id);
    } catch (error) {
      throw new Error(`Error al eliminar usuario: ${error.message}`);
    }
  }

  async authenticate(email, password) {
    try {
      const user = await this.userRepository.findByEmail(email);
      if (!user) {
        throw new Error('Credenciales inválidas');
      }

      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        throw new Error('Credenciales inválidas');
      }

      // Generar JWT
      const token = jwt.sign(
        { 
          userId: user.id, 
          email: user.email,
          rol: user.rol 
        },
        this.JWT_SECRET,
        { expiresIn: '24h' }
      );

      return {
        user: user.toJSON(),
        token
      };
    } catch (error) {
      throw new Error(`Error de autenticación: ${error.message}`);
    }
  }

  async verifyToken(token) {
    try {
      const decoded = jwt.verify(token, this.JWT_SECRET);
      const user = await this.getUserById(decoded.userId);
      return user;
    } catch (error) {
      throw new Error('Token inválido');
    }
  }
}

module.exports = UserService;