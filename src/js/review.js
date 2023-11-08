/* Se importa la clase que renderiza las tarjetas de reseñas */
import { Review } from './api/dtos/review.js';
import { getProducts } from './api/products.js';
import { ReviewCard } from './lib/minirender/reviewsCard.js';
import './components/navbar.js';
import { LOGGED_USER_LS_KEY } from './utils/constants.js';
import { getReviews } from './api/reviews.js';

const stars = document.querySelectorAll('.stars');
const formSubmit = document.getElementById('reviewSubmit');
const reviewlist = document.getElementById('review-list');

/* inputs del formulario de reseñas */
const productName = document.getElementById('productName');
const rating = document.getElementById('ratingContainer');
const review = document.getElementById('reviewInput');

/**Declaración del sweet alert */
const sweetAlertBtn = Swal.mixin({
  customClass: {
    confirmButton: 'btn btn-info',
  },
  buttonsStyling: false,
});

/**Evento para cargar las reseñas existentes al cargar la pagina */
window.addEventListener('DOMContentLoaded', async () => {
    const reviewsDB = await getReviews();
    renderReview(reviewsDB);
});

/**Funcion para renderizar reviews en la lista de reviews */
function renderReview(arr){
  arr.forEach(review => {
    const cardReview = new ReviewCard(review);
    reviewlist.insertAdjacentHTML('beforeend', cardReview.renderCard());
  })
}

/**Filtro de reviews */


/**Se carga la lista de productos en el select del formulario */
let productList;
window.addEventListener('DOMContentLoaded', async () => {
  productList = await getProducts();
  productList.forEach((product) => {
    const option = `<option value="${product.id}" >${product.info}</option>`;
    productName.insertAdjacentHTML('beforeend', option);
  });
});

/* Evento para que el imput de rating sea dinámico, devuelve el valor del rating*/
let ratingValue = 0;
stars.forEach((star, index) => {
  star.addEventListener('click', () => {
    for (let i = 0; i <= index; i++) {
      stars[i].classList.add('checked');
    }
    for (let i = index + 1; i < stars.length; i++) {
      stars[i].classList.remove('checked');
    }
    ratingValue = index + 1;
  });
});

/* Validaciones de los inputs------------- */
/**Validación del rating*/
let isRatingComplete = false;
formSubmit.addEventListener('click', (e) => {
  e.preventDefault();
  if (ratingValue == 0) {
    rating.classList.add('is-invalid');
    isRatingComplete = false;
  } else {
    rating.classList.remove('is-invalid');
    isRatingComplete = true;
  }
});

/**validación del text area */
let isReviewFill = false;
review.addEventListener('blur', () => {
  if (!review.value) {
    review.classList.add('is-invalid');
    isReviewFill = false;
  } else {
    review.classList.remove('is-invalid');
    isReviewFill = true;
  }
});

/**Función para  limpiar el formulario después de agregar una reseña-------------------*/
const clearForm = () => {
  review.value = '';
  stars.forEach((star) => star.classList.remove('checked'));
  ratingValue = 0;
  formSubmit.classList.remove('is-invalid');
};

/**Evento del botón para agregar agregar reseñas */
formSubmit.addEventListener('click', (e) => {
  e.preventDefault();
  const userLogged = localStorage.getItem('userLogged');
  /**Verifica si el usuario ya inicio sesion */
  if (!userLogged) {
    sweetAlertBtn
      .fire({
        title: 'Inicia sesión para dejar una reseña',
        icon: 'error',
        confirmButtonText: 'Iniciar sesión',
      })
      .then(() => {
        window.location.href = 'auth/login.html?fromReview=true';
      });
  } else {
    let isFormValid = isRatingComplete && isReviewFill ? true : false;
    if (!isFormValid) {
      formSubmit.classList.add('is-invalid');
    } else {
      //creacion de nueva reseña
      const newReview = new Review(
        4,
        JSON.parse(localStorage.getItem(LOGGED_USER_LS_KEY)).firstName,
        productList[productName.value].info,
        productList[productName.value].imgUrl,
        ratingValue,
        review.value
      );
      const addReview = new ReviewCard(newReview);
      reviewlist.insertAdjacentHTML('beforeend', addReview.renderCard());
      clearForm();
    }
  }
});
