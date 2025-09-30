/**
 * Representa un pago dentro del sistema
 */
export class Pago {
  /**
   * @param {number|null} id - Identificador único del pago
   * @param {number} monto - Monto del pago
   * @param {string} metodo - Método de pago (ej: "tarjeta_credito")
   * @param {Date|null} [fechaPago=null] - Fecha en que se realizó el pago
   */
  constructor(id = null, monto, metodo, fechaPago = null) {
    this.id = id;               // number | null
    this.monto = monto;         // number
    this.metodo = metodo;       // string
    this.fechaPago = fechaPago; // Date | null
  }
}


