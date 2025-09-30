class UserDTO {
  constructor({ id, nombre, email, direccion }) {
    this.id = id;
    this.nombre = nombre;
    this.email = email;
    this.direccion = direccion;
  }
}

module.exports = UserDTO;
