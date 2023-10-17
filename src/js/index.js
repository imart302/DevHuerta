import { WeekProductCard } from './lib/minirender/weekProductCard.js';
import { NewCard } from './lib/minirender/newsCard.js';
import './components/navbar.js';
import newImg from '../assets/imgs/newsImg.webp';
import { getWeekProducts } from './api/products.js';


/**
 * Aquí van todos los elementos DOM que se requieran del index.html
 */
const INDEX_ELEMENTS = {
  // Contenedor de productos de la semana
  productWeekContainer: document.getElementById('id-products-week'),
};

/**
 * Funcion para llamar a la API y obtener los productos de la semana
 * debe gestionar la promesa del servidor
 */
function fetchWeekProducts() {
  getWeekProducts().then((products) => {
    products.forEach((product) => {
      INDEX_ELEMENTS.productWeekContainer.insertAdjacentHTML(
        'beforeend',
        (new WeekProductCard(product)).renderStr()
      );

    });
  });
}

/**
 * Event listener cuando el DomEs cagado
 */
window.addEventListener('load', () => {

  // Obten los productos de la semana
  fetchWeekProducts();
  /* Mas fetch a la API */
});

/**--------------------------------------------------
 * Sección de noticias
 * --------------------------------------------------*/
const newsContainer = document.querySelector('.dn-news-container');

/*Se crean las tarjetas para cada noticia y se guarda en un array para que se puedan iterar posteriormente*/
const cardsList = [
  /**sintaxis: NewCard('titulo', 'resumen', 'fecha', 'url dela imagen', 'url de la noticia') */
  new NewCard(
    'Por que la miel nunca caduca?',
    'Descubre por qué la miel no tiene fecha de caducidad y es un alimento que desafía el paso del tiempo gracias a sus poderes antimicrobianos',
    '5 de octubre',
    newImg,
    '#'
  ),
  new NewCard(
    'Por que la miel nunca caduca?',
    'Descubre por qué la miel no tiene fecha de caducidad y es un alimento que desafía el paso del tiempo gracias a sus poderes antimicrobianos',
    '5 de octubre',
    newImg,
    '#'
  ),
  new NewCard(
    'Por que la miel nunca caduca?',
    's un alimento que desafía el paso del tiempo gracias a sus poderes antimicrobianos',
    '5 de octubre',
    newImg,
    '#'
  ),
];

/**sintaxis: NewCard('titulo', 'resumen', 'fecha', 'url dela imagen', 'url de la noticia') */

/*cada tarjeta creada en 'cardsList' se renderizá en index.html mediante el método 'renderCard' de la clase 'NewCard'*/
cardsList.forEach((card) => {
  newsContainer.insertAdjacentHTML('beforeend', card.renderCard());
});
