const { Module } = require('@nestjs/common');
const { HttpModule } = require('@nestjs/axios');
const { GatewayController } = require('./gateway.controller');

Module({
  imports: [HttpModule],
  controllers: [GatewayController],
})
class AppModule {}

module.exports = { AppModule };
