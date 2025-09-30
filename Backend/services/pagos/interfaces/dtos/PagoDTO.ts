import { ApiProperty } from '@nestjs/swagger';

export class PagoDTO {
  @ApiProperty({ example: 250.75 })
  monto: number;

  @ApiProperty({ example: 'tarjeta_credito' })
  metodo: string;
}
