class User {
  constructor(id, nombre, email, password, direccion) {
    this.id = id;
    this.nombre = nombre;
    this.email = email;
    this.password = password;
    this.direccion = direccion;
  }
}

module.exports = User;
