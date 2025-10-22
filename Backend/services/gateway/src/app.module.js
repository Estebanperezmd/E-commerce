import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { GatewayController } from './gateway.controller.js';

@Module({
  imports: [HttpModule],
  controllers: [GatewayController],
})
export class AppModule {}
