import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';

@Controller()
export class GatewayController {
  constructor(private readonly httpService) {}

  // Redirigir solicitudes al microservicio de pagos
  @Get('pagos')
  async getPagos() {
    const response = await this.httpService.axiosRef.get('http://pagos:3000/pagos');
    return response.data;
  }

  @Post('pagos')
  async crearPago(@Body() body) {
    const response = await this.httpService.axiosRef.post('http://pagos:3000/pagos', body);
    return response.data;
  }

  // Ejemplo con usuarios
  @Get('usuarios')
  async getUsuarios() {
    const response = await this.httpService.axiosRef.get('http://usuarios:3001/usuarios');
    return response.data;
  }
}
