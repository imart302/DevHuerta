/* Se importa la clase que renderiza las tarjetas de reseñas */
import { Review } from './api/dtos/review.js';
import { getReviews } from './api/reviews.js';
import { ReviewCard } from './lib/minirender/reviewsCard.js';
import './components/navbar.js';
import mielFrasco from '../assets/imgs/miel_frasco.webp';

const stars = document.querySelectorAll('.stars');
const formSubmit = document.getElementById('reviewSubmit');
const reviewlist = document.getElementById('review-list');

/* Objeto de los inputs del formulario de reseñas */
const formInputs = {
  productCategory: document.getElementById('productCategory'),
  productName: document.getElementById('productName'),
  rating: document.getElementById('ratingContainer'),
  review: document.getElementById('reviewInput'),
};

/**Simulación de usuario logeado en la pagina */
const User = 'currentUser';
localStorage.setItem('currentUser', User);

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

/**Funcion para validar los inputs, recibe el elemento html, y el valor invalido, retorna 'true o false' */
function inputValidation(input, invalidValue) {
  if (input.value == invalidValue) {
    input.classList.add('is-invalid');
    return false;
  } else {
    input.classList.remove('is-invalid');
    return true;
  }
}

/* Validaciones de los inputs en tiempo real------------- */
/**Input select de categoría */
formInputs.productCategory.addEventListener('blur', () => {
  if (inputValidation(formInputs.productCategory, 'Categoría')) {
    formInputs.productName.removeAttribute('disabled', '');
  } else {
    formInputs.productName.setAttribute('disabled', '');
  }
});

/**Input select de nombre del producto */
let isProductValid = false;
formInputs.productName.addEventListener('blur', () => {
  inputValidation(formInputs.productName, 'Producto')
    ? (isProductValid = true)
    : (isProductValid = false);
});

/**Validación del rating*/
let isRatingComplete = false;
formSubmit.addEventListener('click', (e) => {
  e.preventDefault();
  if (ratingValue == 0) {
    formInputs.rating.classList.add('is-invalid');
    isRatingComplete = false;
  } else {
    formInputs.rating.classList.remove('is-invalid');
    isRatingComplete = true;
  }
});

/**validación del text area */
let isReviewFill = false;
formInputs.review.addEventListener('blur', () => {
  inputValidation(formInputs.review, '')
    ? (isReviewFill = true)
    : (isReviewFill = false);
});

/**Función para  limpiar el formulario después de agregar una reseña-------------------*/
const clearForm = () => {
  formInputs.productCategory.value = 'Categoria';
  formInputs.productName.value = 'Producto';
  formInputs.productName.setAttribute('disabled', '');
  formInputs.review.value = '';
  stars.forEach((star) => star.classList.remove('checked'));
  ratingValue = 0;
  formSubmit.classList.remove('is-invalid');
};

/**Evento para cargar las reseñas existentes al cargar la pagina */
window.addEventListener('DOMContentLoaded', () => {
  getReviews().then((reviews) => {
    reviews.forEach((review) => {
      const cardReview = new ReviewCard(review).renderCard();
      reviewlist.insertAdjacentHTML('beforeend', cardReview);
    });
  });
});

/**Evento del submit del form para agregar reseñas */
formSubmit.addEventListener('click', (e) => {
  e.preventDefault();
  let isFormValid =
    isProductValid && isRatingComplete && isReviewFill ? true : false;
  if (!isFormValid) {
    formSubmit.classList.add('is-invalid');
  } else {
    const newReview = new Review(
      4,
      localStorage.getItem('currentUser'),
      formInputs.productCategory.value,
      formInputs.productName.value,
      mielFrasco,
      ratingValue,
      formInputs.review.value
    );
    const addReview = new ReviewCard(newReview);
    reviewlist.insertAdjacentHTML('beforeend', addReview.renderCard());
    clearForm();
  }
});
