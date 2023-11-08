import { OrderDbDto } from "../../api/dtos/orderDbDto";


export class OrderListItem {

  order

  /**
   * 
   * @param {OrderDbDto} order 
   */
  constructor(order){
    this.order = order;
  }


  renderStr() {
    return `
      <li id="id-order-${this.order.id}" class="list-group-item">
        <div class="dn-order-list-item d-flex justify-content-between align-content-center">
          <div class="dn-order-list-item-details d-flex flex-column justify-content-start gap-1">
            <p class="m-0 text-bold">Id de orden: ${this.order.id}</p>
            <p class="m-0">Fecha de creación: ${this.order.createdAt}</p>
            <p class="m-0">Total: $${this.order.totalGross} MXN</p>
          </div>
          <button class="btn btn-secondary"><i class="bi bi-trash"></i></button>
        </div>
      </li>
    `
  }

  /**
   * 
   * @param {Function} deleteOrderCb 
   */
  renderDom(deleteOrderCb) {
    const div = document.createElement('div');
    div.innerHTML = this.renderStr();

    const eraseButton = div.querySelector('button');
    eraseButton.addEventListener('click', () => {
      deleteOrderCb(this.order);
    });

    return div.querySelector('li');
  }

}
