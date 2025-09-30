import { Controller, Post, Get, Param, Body } from '@nestjs/common';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { Pago } from '../../domain/entities/Pago';
import { PagoDTO } from '../dtos/PagoDTO';
import { PaymentService } from '../../application/services/PaymentService';
import { CreatePago } from '../../application/use-cases/CreatePago';
import { GetPago } from '../../application/use-cases/GetPago';
import { ListPagos } from '../../application/use-cases/ListPagos';

@ApiTags('Pagos')
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
  @ApiResponse({ status: 201, description: 'Pago creado', type: Pago })
  create(@Body() dto: PagoDTO) {
    return this.createPago.execute(dto);
  }

  @Get()
  @ApiResponse({ status: 200, description: 'Lista de pagos', type: [Pago] })
  list() {
    return this.listPagos.execute();
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'Detalle de pago', type: Pago })
  getById(@Param('id') id: string) {
    return this.getPago.execute(+id);
  }
}
