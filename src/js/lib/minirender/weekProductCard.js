/**
 * Clase para gestionar renderizados
 * de tarjetas de productos
 */

import { ProductDbDto } from '../../api/dtos/product.js';

export class WeekProductCard {
  
  product = null;

  /**
   * 
   * @param {ProductDbDto} product 
   */
  constructor(product) {
    this.product = product;
  }

  renderStr() {
    return `
    <div>
    <div class="dn-week-product-card shadow-lg">
      <img
        src="${this.product.imgUrl}"
        alt="${this.product.name}"
      />
      <div class="dn-card-body">
        <h3>${this.product.name}</h3>
        <p class="dn-card-text">
          ${this.product.info}
        </p>
      </div>
    </div>
    </div>`;
  }
}
