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
  productName: document.getElementById('productName'),
  rating: document.getElementById('ratingContainer'),
  review: document.getElementById('reviewInput'),
};

/**Declaración del sweet alert */
const sweetAlertBtn = Swal.mixin({
  customClass: {
    confirmButton: 'btn btn-info',
  },
  buttonsStyling: false,
});

/**Evento para cargar las reseñas existentes al cargar la pagina */
window.addEventListener('DOMContentLoaded', () => {
  getReviews().then( reviews => {
    reviews.forEach( review => {
      const cardReview = new ReviewCard(review).renderCard();
      reviewlist.insertAdjacentHTML('beforeend', cardReview);
    });
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
  if (!formInputs.review.value) {
    formInputs.review.classList.add('is-invalid');
    isReviewFill = false;
  } else {
    formInputs.review.classList.remove('is-invalid');
    isReviewFill = true;
  }
});

/**Función para  limpiar el formulario después de agregar una reseña-------------------*/
const clearForm = () => {
  formInputs.productName.value = 'Producto 1';
  formInputs.review.value = '';
  stars.forEach((star) => star.classList.remove('checked'));
  ratingValue = 0;
  formSubmit.classList.remove('is-invalid');
};

/**Evento del botón para agregar agregar reseñas */
formSubmit.addEventListener('click', (e) => {
  e.preventDefault();
  const userLogged = localStorage.getItem('userLogged');

  if (!userLogged) {
    sweetAlertBtn
      .fire({
        title: 'Inicia sesión para dejar una reseña',
        icon: 'error',
        confirmButtonText: 'Iniciar sesión',
      })
      .then(() => {
        window.location.href = '../auth/login.html?fromReview=true';
      });
  } else {
    let isFormValid =
      isRatingComplete && isReviewFill ? true : false;
    if (!isFormValid) {
      formSubmit.classList.add('is-invalid');
    } else {
      const newReview = new Review(
        4,
        JSON.parse(localStorage.getItem('userLogged')).firstName,
        formInputs.productName.value,
        mielFrasco,
        ratingValue,
        formInputs.review.value
      );
      const addReview = new ReviewCard(newReview);
      reviewlist.insertAdjacentHTML('beforeend', addReview.renderCard());
      clearForm();
    }
  }
});