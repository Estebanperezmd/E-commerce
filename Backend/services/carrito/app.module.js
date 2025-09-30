const { Module } = require('@nestjs/common');
const { CartController } = require('./interfaces/controllers/CartController');

class AppModule {}

Module({
  controllers: [CartController],
})(AppModule);

module.exports = { AppModule };
