import { ProductDbDto } from '../../api/dtos/product.js';
import { swalWithBootstrapButtons } from '../../utils/sweetAlert.js'

/**
 * Clase para hace render de una tarjeta de producto
 * de compra, extiende del Dto Product de la API
 */
export class ProductShopCard {
  /**
   * {Product}
   */
  product = null;

  /**
   * Constructor
   * @param {ProductDbDto} product
   */
  constructor(product) {
    this.product = product;
  }

  renderStr() {
    return `
      <div class="dn-shop-card card shadow-lg">
      <img
        src="${this.product.imgUrl}"
        class="card-img-top w-75 mx-auto"
        alt="${this.product.name}"
      />
      <div class="card-body">
        <h5 class="card-title">${this.product.name}</h5>
        <p class="dn-shop-card-info card-text">${this.product.info}</p>
        <div
          class="d-flex justify-content-end gap-3"
        >
          <p class="card-text">${this.product.gram}${this.product.typeGram}</p>
          <p class="card-text">|</p>
          <p class="card-text">$${this.product.price} MXN</p>
        </div>

        <hr />
        <div class="dn-shop-cardControls d-flex">
          <div class="input-group">
            <span class="input-group-text">Cantidad: </span>
            <input
              type="number"
              aria-label="First name"
              class="form-control"
              placeholder="1"
              min="1"
            />
          </div>
          <button class="dn-button-addToCart btn btn-primary">
            <i class="bi bi-cart-plus"></i>
          </button>
        </div>
      </div>
    </div>
    `;
  }

  renderDom() {
    const auxDiv = document.createElement('div');
    auxDiv.innerHTML = this.renderStr();
    const btnAddToCart = auxDiv.querySelector('.dn-button-addToCart');

    /**
     * Implementar el botón agregar al carrito debe
     * añadir el objeto en un array dentro de local Storage
     */
    btnAddToCart.addEventListener('click', () => {
      const inputQtyCart = Number.parseInt(auxDiv.querySelector('input').value);
      const quantity =
        Number.isNaN(inputQtyCart) || inputQtyCart < 0 ? 1 : inputQtyCart;
      if (localStorage.getItem('cart')) {
        const cartJson = JSON.parse(localStorage.getItem('cart'));
        cartJson.push({ product: this.product, quantity });
        localStorage.setItem('cart', JSON.stringify(cartJson));
      } else {
        localStorage.setItem(
          'cart',
          JSON.stringify([{ product: this.product, quantity }])
        );
      }
      swalWithBootstrapButtons.fire({
        title: "Se agrego al carrito",
        icon: "success",
        confirmButtonText: "Continuar",
      });
    });

    //Retorna el contenedor de la tarjeta solamente;
    return auxDiv;
  }
}
