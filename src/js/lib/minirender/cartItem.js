import { ProductDbDto } from '../../api/dtos/product';

/**
 * Esta clase representa virtualmente
 * un elemento de un producto en el carrito de compra
 * y lo renderiza a su respectivo DOM Element
 */
export class CartItem {
  product = null;
  quantity = 1;
  /**
   *
   * @param {ProductDbDto} product
   * @param {Number} quantity
   */
  constructor(product,quantity) {
    this.product = product;
    this.quantity = quantity;

  }

  /**
   * Renderiza el objeto del carrito a un string
   * con sus respectivos valores
   * @returns {String}
   */
  renderStr() {
    return `
      <div class="dn-product-cartItem w-100">
      <img src="${this.product.imgUrl}" alt="" />
      <hr>
      <div class="dn-mn-cartlistInfo d-flex flex-column">
        <div>
          <span class="fw-bold">Nombre: </span
          ><span>${this.product.name}</span>
        </div>
        <div><span class="fw-bold">Gramaje: </span><span>${this.product.gram}${this.product.typeGram}</span></div>
        <div>
          <span class="fw-bold">Precio: </span><span>$${this.product.price} MXN</span>
        </div>
        
        <div><span class="fw-bold">Sub-total: </span><span id="id-cart-item-subtotal-${this.product.id}">$${this.product.price*this.quantity} MXN</span></div>
        <div class="dn-cart-item-buttons d-flex mt-4 align-content-center justify-content-between">
          <div class="dn-cart-item-quantity-container align-content-center">
            <span class="fw-bold">Cantidad: </span>
            <span id="id-cart-item-quantity-${this.product.id}">${this.quantity}</span>
            <button id="id-cart-item-decrement-${this.product.id}" class="btn btn-primary ms-1"><i class="bi bi-dash-circle"></i></button>
            <button id="id-cart-item-increment-${this.product.id}" class="btn btn-primary"><i class="bi bi-plus-circle"></i></button>
          </div>
          <hr>
          <button id="id-btn-erase-${this.product.id}" class="btn btn-secondary me-2">
            <i class="bi bi-trash"></i>
          </button>
        </div>
      </div>
    </div>
    `;
  }

  /**
   * Esta función renderiza la tarjeta de un producto
   * en el carrito de compra en un DOM Element además
   * añade los event listener de los botones
   * incrementar, decremetar, y borrar
   * @param {Function} cbReRender Callback para decirle al contenedor que renderize de nuevo
   * @param {any} cartList Lista de productos
   * @param {Function} cbRerenderTotal Callback para que el contenedor de total de compra se renderize
   */
  renderDOM(cbReRender, cartList, cbRerenderTotal){
    const auxiliarDiv=document.createElement('div');
    auxiliarDiv.innerHTML=this.renderStr();

    const increaseButton = auxiliarDiv.querySelector(`#id-cart-item-increment-${this.product.id}`);
    const decreaseButton = auxiliarDiv.querySelector(`#id-cart-item-decrement-${this.product.id}`);

    // Establecemos el event listener de boton incrementar
    increaseButton.addEventListener('click', () => {
      const quantityText = auxiliarDiv.querySelector(`#id-cart-item-quantity-${this.product.id}`);
      const subtotalText = auxiliarDiv.querySelector(`#id-cart-item-subtotal-${this.product.id}`);
      this.quantity = Number.parseInt(quantityText.textContent) + 1;

      //Máximo 100 artículos
      if(this.quantity >= 100) {
        this.quantity = 100;
        return;
      }
      
      // Debe actualizarse el subtotal del producto y el total total
      quantityText.textContent = this.quantity;
      subtotalText.textContent = ` $${this.product.price * this.quantity} MXN`;

      // Debe actualizarse el local storage del carrito
      const itemCart = cartList.find(item => item.product.id === this.product.id);
      itemCart.quantity = this.quantity
      const newCartString= JSON.stringify(cartList);
      localStorage.setItem("cart", newCartString);

      cbRerenderTotal();
    });

    // Establecemos el event listener de boton decrementar
    decreaseButton.addEventListener('click', () => {
      const quantityText = auxiliarDiv.querySelector(`#id-cart-item-quantity-${this.product.id}`);
      const subtotalText = auxiliarDiv.querySelector(`#id-cart-item-subtotal-${this.product.id}`);
      this.quantity = Number.parseInt(quantityText.textContent) - 1;

      // Mínimo debe haber 1 producto
      if(this.quantity <= 0) {
        this.quantity = 1;
        return;
      }

      // Debe actualizarse el subtotal del producto y el total total
      quantityText.textContent = this.quantity;
      subtotalText.textContent = ` $${this.product.price * this.quantity} MXN`;

      // Debe actualizarse el local storage del carrito
      const itemCart = cartList.find(item => item.product.id === this.product.id);
      itemCart.quantity = this.quantity;
      const newCartString= JSON.stringify(cartList);
      localStorage.setItem("cart", newCartString);
      
      cbRerenderTotal();
    });


    // Event listener del botón quitar del carrito
    // debe quitarlo tanto del DOM como del localStorage
    const eraseButton=auxiliarDiv.querySelector(`#id-btn-erase-${this.product.id}`);
    eraseButton.addEventListener('click',()=>{
      const newCart= cartList.filter((item)=>item.product.id!==this.product.id)
      const newCartString= JSON.stringify(newCart)
      localStorage.setItem("cart",newCartString)
      cbReRender()
    });

    return auxiliarDiv;
  }
}

