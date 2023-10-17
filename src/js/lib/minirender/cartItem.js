import { ProductDbDto } from '../../api/dtos/product';

export class CartItem {
  product = null;
  quantity = 1;
  /**
   *
   * @param {ProductDbDto} product
   */
  constructor(product,quantity) {
    this.product = product;
    this.quantity = quantity;

  }
  renderStr() {
    return `
    <div class="dn-product-cartItem w-100">
      <img src="${this.product.imgUrl}" alt="" />
      <div class="dn-mn-cartlistInfo d-flex flex-column">
        <div><span class="fw-bold">Nombre: </span><span>${this.product.name}</span></div>
        <div><span class="fw-bold">Gramaje: </span><span>${this.product.gram}${this.product.typeGram}</span></div>
        <div>
          <span class="fw-bold">Precio: </span><span> $${this.product.price} MXN</span>
        </div>
        <div><span class="fw-bold">Cantidad: </span><span>${this.quantity}</span></div>
        <div><span class="fw-bold">SubTotal: </span><span>${this.quantity*this.product.price}</span></div>
        <div class="button-container"><button class="btn btn-primary"><i class="bi bi-trash"></i></button></div>
      </div>
    `;
  }

  /**
   * 
   * @param {Function} cbReRender 
   */
  renderDOM(cbReRender,cartList){
    const auxiliarDiv=document.createElement('div');
    auxiliarDiv.innerHTML=this.renderStr();
    auxiliarDiv.classList.add("Div-aux")
    const eraseButton=auxiliarDiv.querySelector('button');
    eraseButton.addEventListener('click',()=>{
      const newCart= cartList.filter((item)=>item.product.id!==this.product.id)
      const newCartString= JSON.stringify(newCart)
      localStorage.setItem("cart",newCartString)
      cbReRender()

    });
    return auxiliarDiv;
  }
}

