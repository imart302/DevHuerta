export class OrderItemDbDto {
  productId = 0;
  quantity = 0;

  constructor(productId, quantity){
    this.productId = productId;
    this.quantity = quantity;
  }
}

export class OrderDbDto {

  id = 0;
  totalGross = 0;
  createdAt = ""
  orderItems = [];

  constructor(id, totalGross, createdAt, orderItems){
    this.id = id;
    this.totalGross = totalGross;
    this.createdAt = createdAt;
    this.orderItems = orderItems;
  }

}