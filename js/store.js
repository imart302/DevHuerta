import { getProducts } from 'api/products.js';
import 'components/navbar.js';
import { ProductShopCard } from 'lib/minirender/productShopCard.js';

/**
 * Elementos del DOM del store.html
 * que se necesitan
 */
const STORE_DOM = {

  /* Modal de filtros */
  filterModal: {
    inputs: {
      cat: document.getElementById('id-input-modal-cat'),
      gramType: document.getElementById('id-input-modal-gram'),
      minGram: document.getElementById('id-input-modal-ming'),
      maxGram: document.getElementById('id-input-modal-maxg'),
      minPrice: document.getElementById('id-input-modal-minp'),
      maxPrice: document.getElementById('id-input-modal-maxp'),
    },

    /* Botones limpiar y aplicar del modal */
    buttons: {
      clear: document.getElementById('id-btn-filter-modal-clear'),
      apply: document.getElementById('id-btn-filter-modal-apply'),
    },
  },

  /* Contenedor de tarjetas para comprar productos */
  shopContainer: document.getElementById('id-shop-container'),

  /* Botón flotante para ir al carrito */
  fabCart: document.getElementById('id-fab-cart'),
};

/**
 * Establece el evento de click en el
 * modal de filtro del botón de aplicar
 */
STORE_DOM.filterModal.buttons.apply.addEventListener('click', () => {
  const inputs = STORE_DOM.filterModal.inputs;

  const filterObject = {};

  // Itera sobre todos los inputs y construye on filtro
  Object.keys(inputs).forEach((inputKey) => {
    if (inputs[inputKey].value) {
      filterObject[inputKey] = inputs[inputKey].value;
    }
  });

  console.log(filterObject);
});


/**
 * Limpia los valores de los filtros del
 * modal
 */
STORE_DOM.filterModal.buttons.clear.addEventListener('click', () => {
  const inputs = STORE_DOM.filterModal.inputs;

  // Itera sobre todos los inputs y limpia el value
  Object.keys(inputs).forEach((inputKey) => {
    inputs[inputKey].value = "";
  });

});


/**
 * Evento click del botón flotante carrito
 * cuando se hace click debe ir a mi carrito
 */
STORE_DOM.fabCart.addEventListener('click', () => {
  window.location.href = '/cart.html';
});


/**
 * Event listener cuando el DOM es cargado en
 * el navegador
 */
window.addEventListener('DOMContentLoaded', () => {
  
  /* Obtén los productos de la API y hacer render en el DOM */
  getProducts()
    .then(products => {
      products.forEach(product => {
        const productShopCard = (new ProductShopCard(product)).renderDom();
        STORE_DOM.shopContainer.appendChild(productShopCard);
      });
    });

});