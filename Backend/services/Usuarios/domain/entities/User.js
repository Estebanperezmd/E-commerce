class User {
  constructor(id, nombre, email, password, rol = 'user', fechaCreacion = new Date()) {
    this.id = id;
    this.nombre = nombre;
    this.email = email;
    this.password = password;
    this.rol = rol;
    this.fechaCreacion = fechaCreacion;
    this.validate();
  }

  validate() {
    if (!this.nombre || this.nombre.trim().length === 0) {
      throw new Error('El nombre es requerido');
    }
    if (!this.email || !this.email.includes('@')) {
      throw new Error('Email inválido');
    }
    if (!this.password || this.password.length < 6) {
      throw new Error('La contraseña debe tener al menos 6 caracteres');
    }
    if (!['user', 'admin'].includes(this.rol)) {
      throw new Error('Rol inválido');
    }
  }

  isAdmin() {
    return this.rol === 'admin';
  }

  toJSON() {
    const { password, ...userWithoutPassword } = this;
    return userWithoutPassword;
  }

  static validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  static validatePassword(password) {
    // Al menos 6 caracteres, una mayúscula, una minúscula y un número
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;
    return passwordRegex.test(password);
  }
}

module.exports = User;
