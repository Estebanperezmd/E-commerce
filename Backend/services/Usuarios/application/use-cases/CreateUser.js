const User = require('../../domain/entities/User');
const UserRepository = require('../../infrastructure/repositories/UserRepositoryImpl');

class CreateUser {
  constructor(userRepository = new UserRepository()) {
    this.userRepository = userRepository;
  }

  async execute({ nombre, email, password, rol = 'user' }) {
    try {
      // Verificar si ya existe un usuario con ese email
      const existingUser = await this.userRepository.findByEmail(email);
      if (existingUser) {
        throw new Error('Ya existe un usuario con ese email');
      }

      // Crear instancia de usuario con validaciones
      const user = new User(null, nombre, email, password, rol);
      user.validate();

      // Guardar en el repositorio
      const createdUser = await this.userRepository.create(user);

      // Retornar usuario sin password por seguridad
      const { password: _, ...userWithoutPassword } = createdUser;
      return userWithoutPassword;
    } catch (error) {
      throw new Error(`Error al crear usuario: ${error.message}`);
    }
  }
}

module.exports = CreateUser;
