const ICartRepository = require('../../domain/repositories/ICartRepository');
const ConnectionFactory = require('../databases/ConnectionFactory');

class CartRepository extends ICartRepository {
  async addToCart(cartItem) {
    const insertQuery = `
      INSERT INTO detalle_carrito (id_carrito, id_producto, cantidad, id_usuario, confirmado)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING id_carrito, id_producto, cantidad, id_usuario
    `;
    const values = [
      cartItem.idCarrito, 
      cartItem.idProducto, 
      cartItem.cantidad, 
      cartItem.idUsuario,
      cartItem.confirmado
    ];
    
    const result = await ConnectionFactory.query(insertQuery, values);
    return result.rows[0];
  }
}

module.exports = CartRepository;