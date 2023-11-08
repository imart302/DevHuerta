

export class CreateOrderItem {
  productId = 0;
  quantity = 1;

  constructor(productId, quantity){
    this.productId = productId, this.quantity = quantity;
  }
}

export class CreateOrderDto {

  address = "";
  totalGross = 0;
  orderItems = [];

  constructor(address, totalGross, orderItems = []){
    this.address = address;
    this.totalGross = totalGross;
    this.orderItems = orderItems;
  }

  /**
   * 
   * @param {CreateOrderItem} orderItem 
   */
  addItem(orderItem){
    this.orderItems.push(orderItem);
  }

}