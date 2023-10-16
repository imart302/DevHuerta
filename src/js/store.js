import { getProducts } from './api/products.js';
import { ProductShopCard } from './lib/minirender/productShopCard.js';

import './components/navbar.js';

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

const LS_PRODUCTS_KEY = "products_store";

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

  if(!filterObject) {
    return;
  }

  const products = JSON.parse(localStorage.getItem(LS_PRODUCTS_KEY));

  const filteredProducts = products.filter((product) => {
    if(filterObject.cat && product.category !== filterObject.cat){
      return false;
    }
    if(filterObject.gramType && product.typeGram !== filterObject.gramType){
      return false;
    }
    if(filterObject.minGram && product.gram < filterObject.minGram){
      return false;
    }
    if(filterObject.maxGram && product.gram > filterObject.maxGram){
      return false;
    }
    if(filterObject.minPrice && product.price < filterObject.minPrice){
      return false;
    }
    if(filterObject.maxPrice && product.price > filterObject.maxPrice){
      return false;
    }
    return true;
  });

  STORE_DOM.shopContainer.innerHTML = "";
  filteredProducts.forEach((product) => {
    const productShopCard = new ProductShopCard(product).renderDom();
    STORE_DOM.shopContainer.appendChild(productShopCard);
  });

});

/**
 * Limpia los valores de los filtros del
 * modal
 */
STORE_DOM.filterModal.buttons.clear.addEventListener('click', () => {
  const inputs = STORE_DOM.filterModal.inputs;

  // Itera sobre todos los inputs y limpia el value
  Object.keys(inputs).forEach((inputKey) => {
    inputs[inputKey].value = '';
  });

  const products = JSON.parse(localStorage.getItem(LS_PRODUCTS_KEY));
  STORE_DOM.shopContainer.innerHTML = "";
  products.forEach((product) => {
    const productShopCard = new ProductShopCard(product).renderDom();
    STORE_DOM.shopContainer.appendChild(productShopCard);
  });
});

/**
 * Evento click del botón flotante carrito
 * cuando se hace click debe ir a mi carrito
 */
STORE_DOM.fabCart.addEventListener('click', () => {
  window.location.href = './cart.html';
});

/**
 * Event listener cuando el DOM es cargado en
 * el navegador
 */
window.addEventListener('DOMContentLoaded', () => {
  /* Obtén los productos de la API y hacer render en el DOM */
  getProducts().then((products) => {
    localStorage.setItem(LS_PRODUCTS_KEY, JSON.stringify(products));
    products.forEach((product) => {
      const productShopCard = new ProductShopCard(product).renderDom();
      STORE_DOM.shopContainer.appendChild(productShopCard);
    });
  });
});
