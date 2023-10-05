import { ProductList } from '../../js/lib/minirender/admin/productList.js';

const stubDbProducts = [
  new ProductList(1, 1, "../assets/imgs/DulceNectar.png", "asdf", "Miel", 100, 102, 'l'),
  new ProductList(2, 0.5, "../assets/imgs/DulceNectar.png", "asdf", "Miel", 80, 120, 'l'),
  new ProductList(3, 2, "../assets/imgs/DulceNectar.png", "asdf", "Miel", 180, 45, 'l'),
  new ProductList(4, 40, "../assets/imgs/honey-candy.webp", "asdf", "Dulce de Miel", 40, 1000, 'g'),
  new ProductList(5, 90, "../assets/imgs/honey-candy.webp", "asdf", "Dulce de Miel", 80, 1000, 'g'),
]


/**
 * Elementos del DOM en management.html
 */
const MANAGEMENT_DOM = {
  addProduct: {
    addForm: document.getElementById('id-add-product-form'),
    inputName: document.getElementById('id-input-productName'),
    inputPrice: document.getElementById('id-input-price'),
    inputStock: document.getElementById('id-input-stock'),
    inputImg: document.getElementById('id-input-pic'),
    inputInfo: document.getElementById('id-input-productInfo'),
    inputGrams: document.getElementById('id-input-grammage'),
    inputG: document.getElementById('id-input-g'),
    inputL: document.getElementById('id-input-l'),
  },

  listProducts: {
    listContainer: document.getElementById('id-list-products')
  }
};


/**
 * Establece event listeners del form Añadir Producto
 */
Object.keys(MANAGEMENT_DOM.addProduct).forEach((addProductKey) => {
  const input = MANAGEMENT_DOM.addProduct[addProductKey];
  input.addEventListener('blur', () => {
    if (input.attributes.type.nodeValue != 'file')
      input.value
        ? input.classList.remove('is-invalid')
        : input.classList.add('is-invalid');
  });

  input.addEventListener('input', () => {
    input.value
      ? input.classList.remove('is-invalid')
      : input.classList.add('is-invalid');
  });
});


/**
 * Cuando se hace submit de añadir producto
 * valida los campos y estable errores en el
 * Dom
 */
function validateAddProductFields() {
  const ADD_PRODUCT = MANAGEMENT_DOM.addProduct;
  let badRequest = false;

  if (!ADD_PRODUCT.inputImg.files[0]) {
    badRequest = true;
    ADD_PRODUCT.inputImg.classList.add('is-invalid');
  }

  if (!ADD_PRODUCT.inputName.value) {
    badRequest = true;
    ADD_PRODUCT.inputName.classList.add('is-invalid');
  }

  if (!ADD_PRODUCT.inputInfo.value) {
    badRequest = true;
    ADD_PRODUCT.inputInfo.classList.add('is-invalid');
  }

  if (
    !ADD_PRODUCT.inputPrice.value ||
    !Number.parseInt(ADD_PRODUCT.inputPrice.value) > 0
  ) {
    badRequest = true;
    ADD_PRODUCT.inputPrice.classList.add('is-invalid');
  }

  if (
    !ADD_PRODUCT.inputStock.value ||
    !Number.parseInt(ADD_PRODUCT.inputStock.value) > 0
  ) {
    badRequest = true;
    ADD_PRODUCT.inputStock.classList.add('is-invalid');
  }

  if (
    !ADD_PRODUCT.inputGrams ||
    !Number.parseInt(ADD_PRODUCT.inputGrams.value) > 0
  ) {
    badRequest = true;
    ADD_PRODUCT.inputGrams.classList.add('is-invalid');
  }

  return !badRequest;
}


/**
 * Función para enviar un producto a la API
 * en Multi-part form data 
 */
function sendFormData(product) {
  let formData = new FormData();

  Object.keys(product).forEach((key) => {
    formData.append(key, product[key]);
  });

  for (let v of formData.values()) {
    console.log(v);
  }
  // fetch('/api', {
  //   method: 'POST',
  //   body: formData,
  // });
}


/**
 * Establece el event listener del add product form
 */
MANAGEMENT_DOM.addProduct.addForm.addEventListener('submit', (ev) => {
  ev.preventDefault();
  if (validateAddProductFields()) {
    const ADD_PRODUCT = MANAGEMENT_DOM.addProduct;
    const product = {
      name: ADD_PRODUCT.inputName.value,
      info: ADD_PRODUCT.inputInfo.value,
      gram: parseInt(ADD_PRODUCT.inputGrams.value),
      typeGram: ADD_PRODUCT.inputL.checked ? 'l' : 'g',
      price: parseInt(ADD_PRODUCT.inputPrice.value),
      stock: parseInt(ADD_PRODUCT.inputStock.value),
      imgFile: ADD_PRODUCT.inputImg.files[0],
    };

    console.log(product);
    console.log('New product looks good');
    sendFormData(product);
  } else {
    console.log('You are going to send a bad request');
  }
});


/**
 * Event listener cuando la ventana carga
 */

window.addEventListener('load', () => {

  //Get products from API
  stubDbProducts.forEach((p) => {
    const liP = p.renderDom();
    MANAGEMENT_DOM.listProducts.listContainer.appendChild(liP);
  });

});
