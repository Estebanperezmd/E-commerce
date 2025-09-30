const { Controller, Get, Post, Body } = require('@nestjs/common');
const OrderDTO = require('../dtos/orderDTO');

class OrderController {
  constructor() {
    this.orders = [];
    this.currentId = 1;
  }

  create(orderData) {
    const newOrder = new OrderDTO(
      this.currentId++,
      orderData.userId,
      orderData.items,
      new Date().toISOString(),
      'pending'
    );
    this.orders.push(newOrder);
    return newOrder;
  }

  findAll() {
    return this.orders;
  }
}

// aplicar decoradores manualmente (JS puro)
Post()(OrderController.prototype, 'create', Object.getOwnPropertyDescriptor(OrderController.prototype, 'create'));
Get()(OrderController.prototype, 'findAll', Object.getOwnPropertyDescriptor(OrderController.prototype, 'findAll'));
Controller('orders')(OrderController);

module.exports = { OrderController };
