export class ProductList {
	id = 0;
	gram = 0;
	imgFile = '';
	info = '';
	name = '';
	price = 0;
	stock = 0;
	typeGram = '';

	constructor(id, gram, imgFile, info, name, price, stock, typeGram) {
		this.id = id;
		this.gram = gram;
		this.imgFile = imgFile;
		this.info = info;
		this.name = name;
		this.price = price;
		this.stock = stock;
		this.typeGram = typeGram;
	}

	renderStr() {
		return `
    <div class="dn-mn-product-list-item w-100">
      <div class="dn-mn-product-list-item-img">
        <img src="${this.imgFile}" alt="${this.name}">
      </div>
      <div class="dn-mn-product-list-desc d-flex flex-column">
        <div><span class="fw-bold">Id: </span><span>${this.id}</span></div>
        <div><span class="fw-bold">Nombre: </span><span>${this.name}</span></div>
        <div><span class="fw-bold">Gramaje: </span><span>${this.gram} ${this.typeGram}</span></div>
        <div><span class="fw-bold">Precio: </span><span>$${this.price} MXN</span></div>
        <div><span class="fw-bold">Stock: </span><span>${this.stock}</span></div>
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
			window.location.href = `/admin/product.html?product=${this.id}`;
		});
		return liBase;
	}
}
