class OrderDTO {
  constructor(id, userId, items, createdAt, status) {
    this.id = id;
    this.userId = userId;
    this.items = items;
    this.createdAt = createdAt;
    this.status = status;
  }
}

module.exports = OrderDTO;
