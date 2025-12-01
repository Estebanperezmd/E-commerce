const { AppDataSource } = require("../databases/ConnectionFactory");

class CartRepositoryImpl {
  async ensureCartForUser(userId) {
    // 1) Buscar carrito abierto del usuario
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

    const rows = await AppDataSource.query(selectSql, [userId]);

    if (rows.length > 0) {
      return rows[0];
    }

    // 2) Crear uno nuevo si no hay
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

    const inserted = await AppDataSource.query(insertSql, [userId]);
    return inserted[0];
  }
}

module.exports = CartRepositoryImpl;
