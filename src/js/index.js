import { WeekProductCard } from './lib/minirender/weekProductCard.js';
import { NewCard } from './lib/minirender/newsCard.js';
import './components/navbar.js';
import newImg1 from '../assets/imgs/news1.webp';
import newImg2 from '../assets/imgs/news2.webp';
import newImg3 from '../assets/imgs/news3.webp';
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
    '7 comportamientos de las abejas sorprendentes y difíciles de explicar',
    'Las abejas conforman una sociedad compleja que el ser humano lleva observando y estudiando desde la Antigüedad. Sin embargo, hay comportamientos que todavía nos sorprenden y aun no sabemos explicar.',
    '12 de octubre',
    newImg1,
    'https://apiculturaymiel.com/abejas/comportamientos-de-las-abejas-sorprendentes-dificiles-explicar/'
  ),
  new NewCard(
    'Cera estampada: qué son, cómo se hacen y cómo se manejan las láminas de cera.',
    'Las láminas de cera estampada son uno de los pilares fundamentales de la apicultura moderna. En este artículo te explicamos qué son y cómo se manejan en las colmenas.',
    '8 de junio',
    newImg2,
    'https://apiculturaymiel.com/cera/cera-estampada-que-son-como-se-hacen-como-se-manejan-laminas-de-cera/'
  ),
  new NewCard(
    'Pequeño escarabajo de la colmena: que es y como se combate',
    'El pequeño escarabajo de la colmena se ha convertido en una amenaza para la apicultura en todo el mundo. Es un depredador de las abejas y sus larvas. Te contamos qué es y cómo se combate.',
    '1 de octubre',
    newImg3,
    'https://apiculturaymiel.com/enfermedades-de-las-abejas/pequeno-escarabajo-de-la-colmena-que-es-como-se-combate/'
  ),
];

/**sintaxis: NewCard('titulo', 'resumen', 'fecha', 'url dela imagen', 'url de la noticia') */

/*cada tarjeta creada en 'cardsList' se renderizá en index.html mediante el método 'renderCard' de la clase 'NewCard'*/
cardsList.forEach((card) => {
  newsContainer.insertAdjacentHTML('beforeend', card.renderCard());
});
