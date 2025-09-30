import { ApiProperty } from '@nestjs/swagger';

export class PagoDTO {
  @ApiProperty({ example: 250.75, description: 'Monto del pago en pesos' })
  monto;

  @ApiProperty({ example: 'tarjeta_credito', description: 'Método de pago utilizado' })
  metodo;
}
