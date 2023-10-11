/**
 * Clase para gestionar renderizados
 * de tarjetas de productos
 */

import { AbstractProduct } from './abstractProduct.js';

export class WeekProduct extends AbstractProduct {
  constructor(title, description, imgUrl) {
    super(title, description, imgUrl);
  }

  renderStr() {
    return `
    <div class="dn-week-product-card">
      <div class="card shadow-lg" style="width: 18rem;">
        <img src="${this.imgUrl}" class="card-img-top" alt="${this.title}">
        <div class="card-body">
          <h5>${this.title}</h5>
          <p class="card-text">${this.description}</p>
        </div>
      </div>
    </div>`;
  }
}
