import { WeekProduct } from "./lib/minirender/weekProduct.js";
import './components/navbar.js';


export const productosFake = [
  new WeekProduct('Title1', 'Quick description', './assets/imgs/miel_frasco.webp'),
  new WeekProduct('Title2', 'Quick description', './assets/imgs/miel_frasco.webp'),
  new WeekProduct('Title3', 'Quick description', './assets/imgs/miel_frasco.webp'),
  new WeekProduct('Title4', 'Quick description', './assets/imgs/miel_frasco.webp')
]


/** 
 * Aquí van todos los elementos DOM que se requieran del index.html
 */ 
const INDEX_ELEMENTS = {
  // Contenedor de productos de la semana
  productWeekContainer: document.getElementById('id-products-week'),
}


window.addEventListener('load', () => {
  
  //Aquí es el momento ideal para obtener los productos de la semana de la API
  productosFake.forEach((p) => {
    INDEX_ELEMENTS.productWeekContainer.insertAdjacentHTML('beforeend', p.renderStr());
  });

  /* Mas fetch a la API */

});

