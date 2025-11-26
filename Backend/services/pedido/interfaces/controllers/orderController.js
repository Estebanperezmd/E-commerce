const ConnectionFactory = require("../../infrastructure/databases/ConnectionFactory");

class OrderController {
  // Crea una orden en la tabla Ordenes
  static async createOrder(req, res) {
    try {
      const { idUsuario, totalAmount, paymentInfo } = req.body;

      if (!idUsuario) {
        return res
          .status(400)
          .json({ message: "idUsuario es requerido para crear una orden" });
      }

      // totalAmount opcional, por si aún no lo mandas desde el front
      const total = typeof totalAmount === "number" ? totalAmount : 0;

      // paymentInfo opcional, viene como objeto; lo guardamos como JSON
      const paymentJson = JSON.stringify(paymentInfo || {});

      const insertSql = `
        INSERT INTO "Ordenes" (
          status,
          fecha_creacion,
          link_invitación,
          id_usuario_principal,
          invitado_1,
          invitado_2,
          invitado_3,
          total_amount,
          payment_information
        )
        VALUES ($1, NOW(), $2, $3, $4, $5, $6, $7, $8)
        RETURNING *;
      `;

      const values = [
        "CREATED",      // status
        1,           // link_invitacion (por ahora null)
        idUsuario,      // id_usuario_principal
        null,           // invitado_1
        null,           // invitado_2
        null,           // invitado_3
        total,          // total_amount
        paymentJson     // payment_information
      ];

      const result = await ConnectionFactory.query(insertSql, values);

      const rows = Array.isArray(result) ? result : result?.rows || [];
      const order = rows[0];

      if (!order) {
        return res
          .status(500)
          .json({ message: "No se pudo crear la orden (sin resultado)" });
      }

      return res.status(201).json(order);
    } catch (error) {
      console.error("Error en createOrder:", error);
      return res.status(500).json({ error: error.message });
    }
  }

  // Obtener orden por id desde la tabla Ordenes
  static async getOrderById(req, res) {
    try {
      const { id } = req.params;

      const selectSql = `SELECT * FROM "Ordenes" WHERE id = $1`;
      const result = await ConnectionFactory.query(selectSql, [id]);

      const rows = Array.isArray(result) ? result : result?.rows || [];

      if (rows.length === 0) {
        return res.status(404).json({ message: "Orden no encontrada" });
      }

      return res.status(200).json(rows[0]);
    } catch (error) {
      console.error("Error en getOrderById:", error);
      return res.status(500).json({ error: error.message });
    }
  }
}

module.exports = OrderController;
