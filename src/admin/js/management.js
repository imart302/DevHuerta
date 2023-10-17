import { ProductList } from '../../js/lib/minirender/admin/productList.js';
import dulceNectarImg from '../../assets/imgs/DulceNectar.png';
import honeyCandyImg from '../../assets/imgs/honey-candy.webp';
import { URL_REGEX } from '../../js/utils/constants.js';
import { NewProductDto } from '../../js/api/dtos/newProduct.js';
import { createProduct, getProducts } from '../../js/api/products.js';
import { swalWithBootstrapButtons } from '../../js/utils/sweetAlert.js';

const stubDbProducts = [
  new ProductList(1, 1, dulceNectarImg, 'asdf', 'Miel', 100, 102, 'l'),
  new ProductList(2, 0.5, dulceNectarImg, 'asdf', 'Miel', 80, 120, 'l'),
  new ProductList(3, 2, dulceNectarImg, 'asdf', 'Miel', 180, 45, 'l'),
  new ProductList(4, 40, honeyCandyImg, 'asdf', 'Dulce de Miel', 40, 1000, 'g'),
  new ProductList(5, 90, honeyCandyImg, 'asdf', 'Dulce de Miel', 80, 1000, 'g'),
];

/**
 * Elementos del DOM en management.html
 */
const MANAGEMENT_DOM = {
  addForm: document.getElementById('id-add-product-form'),
  addProduct: {
    inputName: document.getElementById('id-input-productName'),
    inputPrice: document.getElementById('id-input-price'),
    inputStock: document.getElementById('id-input-stock'),
    //inputImg: document.getElementById('id-input-pic'),
    inputInfo: document.getElementById('id-input-productInfo'),
    inputGrams: document.getElementById('id-input-grammage'),
    inputG: document.getElementById('id-input-g'),
    inputL: document.getElementById('id-input-l'),
    inputImgUrl: document.getElementById('id-input-imgUrl'),
    inputCategory: document.getElementById('id-input-category'),
  },

  listProducts: {
    listContainer: document.getElementById('id-list-products'),
  },

  /**
   * Función para limpiar los valores de los inputs
   */
  clearInputs: function () {
    Object.keys(this.addProduct).forEach((keyInput) => {
      const input = this.addProduct[keyInput];
      if (input.type != 'select-one') {
        input.value = '';
      }
    });
  },
};

/**
 * Establece event listeners del form Añadir Producto
 */
Object.keys(MANAGEMENT_DOM.addProduct).forEach((addProductKey) => {
  const input = MANAGEMENT_DOM.addProduct[addProductKey];

  // Evento de blur
  input.addEventListener('blur', () => {
    // Checar que los campos a excepción de select no estén vacíos
    if (input.type != 'select-one') {
      input.value
        ? input.classList.remove('is-invalid')
        : input.classList.add('is-invalid');
    }

    // Checar que el input del url de la imagen tenga la forma de un URL
    if (input.id == 'id-input-imgUrl' && input.value) {
      console.log(input.value);
      console.log(URL_REGEX.test(input.value));
      if (URL_REGEX.test(input.value)) input.classList.remove('is-invalid');
      else input.classList.add('is-invalid');
    }
  });

  // Evento input, cuando sucede verificar que el value no este vacío
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

  // if (!ADD_PRODUCT.inputImg.files[0]) {
  //   badRequest = true;
  //   ADD_PRODUCT.inputImg.classList.add('is-invalid');
  // }

  if (!ADD_PRODUCT.inputImgUrl.value) {
    badRequest = true;
    ADD_PRODUCT.inputImgUrl.classList.add('is-invalid');
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
// function sendFormData(product) {
//   let formData = new FormData();

//   Object.keys(product).forEach((key) => {
//     formData.append(key, product[key]);
//   });

//   for (let v of formData.values()) {
//     console.log(v);
//   }
//   // fetch('/api', {
//   //   method: 'POST',
//   //   body: formData,
//   // });
// }

/**
 * Función para llamar a la función correspondiente
 * de API para crear un nuevo producto en el backend
 * @param {NewProductDto} product
 */
function sendCreateProduct(product) {
  createProduct(product)
    .then((productResponse) => {
      console.log(productResponse);
      swalWithBootstrapButtons.fire({
        title: 'Producto creado',
        icon: 'success',
        confirmButtonText: 'Entendido',
      });
    })
    .catch((error) => {
      console.log(error);
    });
}

function fetchProductsFromAPI() {
  getProducts().then((products) => {
    products.forEach((product) => {
      const pList = new ProductList(product);

      const liP = pList.renderDom();
      MANAGEMENT_DOM.listProducts.listContainer.appendChild(liP);
    });
  });
}

/**
 * Establece el event listener del add product form
 */
MANAGEMENT_DOM.addForm.addEventListener('submit', (ev) => {
  // Prevé que la ventana se recargue cuando se da submit al form
  ev.preventDefault();

  if (validateAddProductFields()) {
    // Si todos los campos estaban bien continua
    const ADD_PRODUCT = MANAGEMENT_DOM.addProduct;

    const product = new NewProductDto(
      ADD_PRODUCT.inputCategory.value,
      parseInt(ADD_PRODUCT.inputGrams.value),
      ADD_PRODUCT.inputImgUrl.value,
      ADD_PRODUCT.inputInfo.value,
      ADD_PRODUCT.inputName.value,
      parseInt(ADD_PRODUCT.inputPrice.value),
      parseInt(ADD_PRODUCT.inputStock.value),
      ADD_PRODUCT.inputL.checked ? 'l' : 'g'
    );

    // sendFormData(product);
    sendCreateProduct(product);
    MANAGEMENT_DOM.clearInputs();
  }
});

/**
 * Event listener cuando la ventana carga
 */
window.addEventListener('load', () => {
  //Get products from API
  fetchProductsFromAPI();
});
