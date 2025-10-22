class PagoDTO {
  constructor({ id = null, monto, metodo, fechaPago = null }) {
    this.id = id;
    this.monto = monto;
    this.metodo = metodo;
    this.fechaPago = fechaPago;
  }

  // Método para convertir desde entidad a DTO
  static fromEntity(pago) {
    return new PagoDTO({
      id: pago.id,
      monto: pago.monto,
      metodo: pago.metodo,
      fechaPago: pago.fechaPago
    });
  }

  // Método para convertir desde DTO a entidad
  static toEntity(dto) {
    return {
      id: dto.id,
      monto: dto.monto,
      metodo: dto.metodo,
      fechaPago: dto.fechaPago
    };
  }
}

module.exports = PagoDTO;
