import { Controller, Post, Get, Param, Body } from '@nestjs/common';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { PagoDTO } from '../dtos/PagoDTO';
import { Pago } from '../../domain/entities/Pago';
import { PaymentService } from '../../application/services/PaymentService';
import { CreatePago } from '../../application/use-cases/CreatePago';
import { GetPago } from '../../application/use-cases/GetPago';
import { ListPagos } from '../../application/use-cases/ListPagos';

@ApiTags('Pagos') // Esto agrupa los endpoints bajo la categoría "Pagos" en Swagger
@Controller('pagos')
export class PagoController {
  private createPago: CreatePago;
  private getPago: GetPago;
  private listPagos: ListPagos;

  constructor(private readonly paymentService: PaymentService) {
    this.createPago = new CreatePago(this.paymentService);
    this.getPago = new GetPago(this.paymentService);
    this.listPagos = new ListPagos(this.paymentService);
  }

  @Post()
  @ApiResponse({
    status: 201,
    description: 'Pago creado exitosamente',
    type: Pago,
  })
  create(@Body() dto: PagoDTO) {
    return this.createPago.execute(dto);
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Lista de todos los pagos',
    type: [Pago],
  })
  list() {
    return this.listPagos.execute();
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'Detalle de un pago específico',
    type: Pago,
  })
  getById(@Param('id') id: string) {
    return this.getPago.execute(+id);
  }
}

