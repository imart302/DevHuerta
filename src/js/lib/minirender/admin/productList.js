import { ProductDbDto } from "../../../api/dtos/product";

export class ProductList {

  product = null;

  /**
   * 
   * @param {ProductDbDto} product 
   */
	constructor(product) {
    this.product = product
	}

	renderStr() {
		return `
    <div class="dn-mn-product-list-item w-100">
      <div class="dn-mn-product-list-item-img">
        <img src="${this.product.imgUrl}" alt="${this.product.name}">
      </div>
      <div class="dn-mn-product-list-desc d-flex flex-column">
        <div><span class="fw-bold">Id: </span><span>${this.product.id}</span></div>
        <div><span class="fw-bold">Nombre: </span><span>${this.product.name}</span></div>
        <div><span class="fw-bold">Gramaje: </span><span>${this.product.gram} ${this.product.typeGram}</span></div>
        <div><span class="fw-bold">Precio: </span><span>$${this.product.price} MXN</span></div>
        <div><span class="fw-bold">Stock: </span><span>${this.product.stock}</span></div>
      </div>
    </div>
    `;
	}

	renderDom(classList = 'list-group-item') {
		const liBase = document.createElement('li');
		liBase.classList.add(classList);
		liBase.innerHTML = this.renderStr();
		const itemContainer = liBase.querySelector('.dn-mn-product-list-item');
		itemContainer.addEventListener('click', () => {
			window.location.href = `product.html?product=${this.id}`;
		});
		return liBase;
	}
}
