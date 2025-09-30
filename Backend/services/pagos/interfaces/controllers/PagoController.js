import { Controller, Post, Get, Param, Body } from '@nestjs/common';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { PagoDTO } from '../dtos/PagoDTO.js';
import { Pago } from '../../domain/entities/Pago.js';
import { PaymentService } from '../../application/services/PaymentService.js';
import { CreatePago } from '../../application/use-cases/CreatePago.js';
import { GetPago } from '../../application/use-cases/GetPago.js';
import { ListPagos } from '../../application/use-cases/ListPagos.js';

@ApiTags('Pagos') // Agrupa los endpoints bajo la categoría "Pagos" en Swagger
@Controller('pagos')
export class PagoController {
  constructor(paymentService) {
    this.paymentService = paymentService;
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
  create(@Body() dto) {
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
  getById(@Param('id') id) {
    return this.getPago.execute(+id);
  }
}
