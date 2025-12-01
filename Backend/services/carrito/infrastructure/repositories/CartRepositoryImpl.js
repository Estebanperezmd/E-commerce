// infrastructure/repositories/CartRepositoryImpl.js
const { query } = require("../databases/ConnectionFactory");

class CartRepositoryImpl {
  async ensureCartForUser(userId) {
    // 1) Buscar carrito "open" del usuario
    const selectSql = `
      SELECT 
        id_carrito,
        status,
        fecha_creación,
        invitation_link,
        id_main_user
      FROM "Carritos"
      WHERE id_main_user = $1 AND status = 'open'
      LIMIT 1
    `;

    const rows = await query(selectSql, [userId]);
    if (rows.length > 0) return rows[0];

    // 2) Crear si no existe
    const insertSql = `
      INSERT INTO "Carritos" (status, fecha_creación, invitation_link, id_main_user)
      VALUES ('open', NOW(), NULL, $1)
      RETURNING 
        id_carrito,
        status,
        fecha_creación,
        invitation_link,
        id_main_user
    `;

    const inserted = await query(insertSql, [userId]);
    return inserted[0];
  }
}

module.exports = CartRepositoryImpl;
