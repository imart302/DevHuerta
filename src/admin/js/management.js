import { ProductListItem } from '../../js/lib/minirender/admin/productList.js';
import { URL_REGEX } from '../../js/utils/constants.js';
import { NewProductDto } from '../../js/api/dtos/newProduct.js';
import {
  createProduct,
  getProducts,
  updateProduct,
  deleteProduct,
} from '../../js/api/products.js';
import { swalWithBootstrapButtons } from '../../js/utils/sweetAlert.js';
import { ProductDbDto } from '../../js/api/dtos/product.js';

// UNUSEDconst stubDbProducts = [
//   new ProductListItem(1, 1, dulceNectarImg, 'asdf', 'Miel', 100, 102, 'l'),
//   new ProductListItem(2, 0.5, dulceNectarImg, 'asdf', 'Miel', 80, 120, 'l'),
//   new ProductListItem(3, 2, dulceNectarImg, 'asdf', 'Miel', 180, 45, 'l'),
//   new ProductListItem(4, 40, honeyCandyImg, 'asdf', 'Dulce de Miel', 40, 1000, 'g'),
//   new ProductListItem(5, 90, honeyCandyImg, 'asdf', 'Dulce de Miel', 80, 1000, 'g'),
// ];

/**
 * Elementos del DOM en management.html
 */
const MANAGEMENT_DOM = {
  addForm: document.getElementById('id-add-product-form'),
  saveProduct: document.getElementById('id-btn-modifyProduct-modal-save'),
  deleteProduct: document.getElementById('id-btn-modifyProduct-modal-delete'),

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

  updateProduct: {
    modifiedId: document.getElementById('id-input-modifyProductId'),
    modifiedName: document.getElementById('id-input-modifyProductName'),
    modifiedPrice: document.getElementById('id-input-modifyPrice'),
    modifiedStock: document.getElementById('id-input-modifyStock'),
    modifiedInfo: document.getElementById('id-input-modifyInfo'),
    modifiedGrammage: document.getElementById('id-input-modifyGrammage'),
    modifiedL: document.getElementById('id-input-modify-l'),
    modifiedG: document.getElementById('id-input-modify-g'),
    modifiedImgUrl: document.getElementById('id-input-modifyImgUrl'),
    modifiedCategory: document.getElementById('id-input-modifyCategory'),
  },
  //elemento para controlar el modal
  modalModifyProdcuct: new bootstrap.Modal(
    document.getElementById('id-modal-modifyProducts'),
    {
      backdrop: true,
    }
  ),

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
 * Establece event listeners a los elementos inputs del elemento form
 */
function setInputValidation(sectionToValidate) {
  Object.keys(sectionToValidate).forEach((inputElementKey) => {
    const input = sectionToValidate[inputElementKey];

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
}

/**
 * Cuando se hace submit a new product o modify product
 * valida los campos y establece errores en el
 * Dom
 */
function validateFieldsOnSubmit(formToValidate) {
  let badRequest = false;

  Object.keys(formToValidate).forEach((htmlFormElementKey) => {
    const input = formToValidate[htmlFormElementKey];
    //Valida que lo url cumplan con estructura y no esten vacios
    if (input.type == 'url') {
      if (!input.value || !URL_REGEX.test(input.value)) {
        badRequest = true;
        input.classList.add('is-invalid');
        console.log('Entro a url', input);
      } else {
        input.classList.remove('is-invalid');
      }
    }
    //Valida que los campos númericos sean mayores a 0 y no esten vacios
    if (input.type == 'number') {
      if (!input.value || !Number.parseFloat(input.value) > 0) {
        badRequest = true;
        input.classList.add('is-invalid');
        console.log('Entro a number', input);
      } else {
        input.classList.remove('is-invalid');
      }
    }

    //Se valida que lo campos de texto no esten vacios
    if (input.type == 'text') {
      if (!input.value) {
        badRequest = true;
        input.classList.add('is-invalid');
        console.log('Entro a text', input);
      } else {
        input.classList.remove('is-invalid');
      }
    } 
  });
  //Si todas las validaciones son aprobadas, badrequest permanece en 0
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
      const newItem = new ProductListItem(productResponse);
      const renderNewItem = newItem.renderDom(setValuestoModal);
      MANAGEMENT_DOM.listProducts.listContainer.appendChild(renderNewItem);
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
      const pList = new ProductListItem(product);
      const liP = pList.renderDom(setValuestoModal);
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
  /**
   * Si Se pasan todas las validaciones, procede a crear el producto
   */
  if (validateFieldsOnSubmit(MANAGEMENT_DOM.addProduct)) {
    // Si todos los campos estaban bien, continua
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

    // funcion fetch con Metodo POST implementado en CreateProduct()
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
  setInputValidation(MANAGEMENT_DOM.addProduct);
  setInputValidation(MANAGEMENT_DOM.updateProduct);
});

//Aqui se reasignan los parametros de cada uno de los inputs en el modal de modificacion
function setValuestoModal(product) {
  MANAGEMENT_DOM.updateProduct.modifiedId.value = product.id;
  MANAGEMENT_DOM.updateProduct.modifiedName.value = product.name;
  MANAGEMENT_DOM.updateProduct.modifiedPrice.value = product.price;
  MANAGEMENT_DOM.updateProduct.modifiedStock.value = product.stock;
  MANAGEMENT_DOM.updateProduct.modifiedInfo.value = product.info;
  MANAGEMENT_DOM.updateProduct.modifiedGrammage.value = product.gram;
  // typegram
  product.typeGram == 'l'
    ? (MANAGEMENT_DOM.updateProduct.modifiedL.checked = true)
    : (MANAGEMENT_DOM.updateProduct.modifiedG.checked = true);
  //
  MANAGEMENT_DOM.updateProduct.modifiedImgUrl.value = product.imgUrl;
  MANAGEMENT_DOM.updateProduct.modifiedCategory.value = product.category.name;

  validateFieldsOnSubmit(MANAGEMENT_DOM.updateProduct);
}

//Event listener para borrar elementos de la BD y del DOM
MANAGEMENT_DOM.deleteProduct.addEventListener('click', async () => {
  
  let id = MANAGEMENT_DOM.updateProduct.modifiedId.value;
  let deletedItem = MANAGEMENT_DOM.listProducts.listContainer.querySelector(
    `#id-product-${id}`
  );
  deleteProduct(id);

  MANAGEMENT_DOM.listProducts.listContainer.removeChild(deletedItem);
  //Alerta de confirmación
  await swalWithBootstrapButtons.fire({
    title: 'Producto eliminado',
    icon: 'success',
    confirmButtonText: 'Entendido',
  });

});


// Event Listner encargado de guradar cambios en BD y mostrar en DOM
MANAGEMENT_DOM.saveProduct.addEventListener('click', async () => {
  if (validateFieldsOnSubmit(MANAGEMENT_DOM.updateProduct)) {

    //Crea el producto con la información modificada en el modal
    const product = new ProductDbDto(
      MANAGEMENT_DOM.updateProduct.modifiedCategory.value,
      MANAGEMENT_DOM.updateProduct.modifiedGrammage.value,
      MANAGEMENT_DOM.updateProduct.modifiedImgUrl.value,
      MANAGEMENT_DOM.updateProduct.modifiedInfo.value,
      MANAGEMENT_DOM.updateProduct.modifiedName.value,
      MANAGEMENT_DOM.updateProduct.modifiedPrice.value,
      MANAGEMENT_DOM.updateProduct.modifiedStock.value,
      MANAGEMENT_DOM.updateProduct.modifiedL.checked ? 'l' : 'g'
    );
    const id = MANAGEMENT_DOM.updateProduct.modifiedId.value

    //Funcion fetch con el metodo PUT (modifica BD) declarado en products.js
    let updatedProduct = await updateProduct(id, product)
    
    //Crea una nueva instancia de product list Item, para
    //poder acceder a los metodos renderDom (Crear HTML element)
    const updatedItem = new ProductListItem(updatedProduct);
    const renderUpdatedItem = updatedItem.renderDom(setValuestoModal);

    // //Se accede al elemento a sustituir
    let oldItem = MANAGEMENT_DOM.listProducts.listContainer.querySelector(
    `#id-product-${id}`);

    // //Se sustituye el elemento original con la información nueva
    oldItem.replaceWith(renderUpdatedItem);

    //Alerta de confirmación
    await swalWithBootstrapButtons.fire({
      title: 'Producto modificado',
      icon: 'success',
      confirmButtonText: 'Entendido',
    })
    

    //Cerrar el modal
    MANAGEMENT_DOM.modalModifyProdcuct.hide();
    
  } else {
    await swalWithBootstrapButtons.fire({
      title: 'Campos no validos',
      icon: 'warning',
      confirmButtonText: 'Entendido',
    });
  }
});
