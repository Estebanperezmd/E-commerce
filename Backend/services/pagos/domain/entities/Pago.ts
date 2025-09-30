import { ApiProperty } from '@nestjs/swagger';

export class Pago {
  @ApiProperty({ example: 1 })
  id: number | null;

  @ApiProperty({ example: 250.75 })
  monto: number;

  @ApiProperty({ example: 'tarjeta_credito' })
  metodo: string;

  @ApiProperty({ example: '2025-09-29T20:00:00Z' })
  fechaPago: Date | null;

  constructor(
    id: number | null,
    monto: number,
    metodo: string,
    fechaPago: Date | null = null,
  ) {
    this.id = id;
    this.monto = monto;
    this.metodo = metodo;
    this.fechaPago = fechaPago;
  }
}
