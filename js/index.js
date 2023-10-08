import { WeekProduct } from "./lib/minirender/weekProduct.js";
import { NewCard } from "./lib/minirender/newsCard.js";
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


/**--------------------------------------------------
 * Seccion de noticias
 * --------------------------------------------------*/
const newsContainer = document.querySelector('.dn-news-container');


/*Se crean las tarjetas para cada noticia y se guarda en un array para que se puedan iterar porteriormente*/
const cardsList = [
    /**sintaxis: NewCard('titulo', 'resumen', 'fecha', 'url dela imagen', 'url de la noticia') */
    new NewCard('Por que la miel nunca caduca?', 'Descubre por qué la miel no tiene fecha de caducidad y es un alimento que desafía el paso del tiempo gracias a sus poderes antimicrobianos', '5 de octubre', './assets/imgs/newsImg.webp','#'),
    new NewCard('Por que la miel nunca caduca?', 'Descubre por qué la miel no tiene fecha de caducidad y es un alimento que desafía el paso del tiempo gracias a sus poderes antimicrobianos', '5 de octubre', './assets/imgs/newsImg.webp', '#'),
    new NewCard('Por que la miel nunca caduca?', 's un alimento que desafía el paso del tiempo gracias a sus poderes antimicrobianos', '5 de octubre', './assets/imgs/newsImg.webp', '#')
];

/*cada tarjeta creada en 'cardsList' se renderiza en index.html mediante el metodo 'renderCard' de la clase 'NewCard'*/
cardsList.forEach(card => {
    newsContainer.insertAdjacentHTML('beforeend', card.renderCard(card));
});