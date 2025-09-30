const { Module } = require('@nestjs/common');
const { OrderController } = require('./interfaces/controllers/orderController');

class AppModule {}
Module({
  controllers: [OrderController],
})(AppModule);

module.exports = { AppModule };
