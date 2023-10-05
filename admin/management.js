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
};

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

function validateAddProductFields() {
  const ADD_PRODUCT = MANAGEMENT_DOM.addProduct;
  let badRequest = false;

  if( !ADD_PRODUCT.inputImg.files[0] ) {
    badRequest = true;
    ADD_PRODUCT.inputImg.classList.add('is-invalid');
  }

  if( !ADD_PRODUCT.inputName.value) {
    badRequest = true;
    ADD_PRODUCT.inputName.classList.add('is-invalid');
  }
  
  if( !ADD_PRODUCT.inputInfo.value) {
    badRequest = true;
    ADD_PRODUCT.inputInfo.classList.add('is-invalid');
  }

  if( !ADD_PRODUCT.inputPrice.value || !Number.parseInt(ADD_PRODUCT.inputPrice.value) > 0){
    badRequest = true;
    ADD_PRODUCT.inputPrice.classList.add('is-invalid');
  }

  if( !ADD_PRODUCT.inputStock.value || !Number.parseInt(ADD_PRODUCT.inputStock.value) > 0){
    badRequest = true;
    ADD_PRODUCT.inputStock.classList.add('is-invalid');
  }

  if( !ADD_PRODUCT.inputGrams || !Number.parseInt(ADD_PRODUCT.inputGrams.value) > 0) {
    badRequest = true;
    ADD_PRODUCT.inputGrams.classList.add('is-invalid');
  }

  return !badRequest;
}

function sendFormData(product) {
  let formData = new FormData();

  Object.keys(product).forEach((key) => {
    formData.append(key, product[key]);
  });

  for(let v of formData.values()) {
    console.log(v);
  }
  // fetch('/api', {
  //   method: 'POST',
  //   body: formData,
  // });
}

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
