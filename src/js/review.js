/* Se importa la clase que renderiza las tarjetas de reseñas */
import { ReviewCard } from './lib/minirender/reviewsCard.js';
import './components/navbar.js';
import {
  getReviews,
  createReview,
  getProdTemp,
  currentUser,
} from './api/reviews.js';

const stars = document.querySelectorAll('.stars');
const formSubmit = document.getElementById('reviewSubmit');
const reviewlist = document.getElementById('review-list');
const reviewFilter = document.getElementById('reviewfilter');
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
let reviewsDB = [];
let filterValues = new Set();
window.addEventListener('DOMContentLoaded', async () => {
  const response = await getReviews();
  response.forEach((review) => {
    const reviewCard = new ReviewCard(review);
    reviewsDB.push(reviewCard);
    filterValues.add(review.productName);
  });
  renderFilter(filterValues);
  renderReviewList(reviewsDB);
});

/**Render de lso elementos del filtro de la lista de reseñas */
function renderFilter(setProducts) {
  setProducts.forEach((product) =>
    reviewFilter.insertAdjacentHTML('beforeend', `<option>${product}</option>`)
  );
}

/**Filtro de la lista de reseñas */
reviewFilter.addEventListener('change', () => {
  let selected = reviewFilter.value;
  if (selected == 'Todos los productos') {
    renderReviewList(reviewsDB);
  } else if (selected == 'Mis reseñas') {
    if (currentUser == null) {
      sweetAlertBtn
      .fire({
        title: 'Inicia sesión para ver sus reseñas',
        icon: 'error',
        confirmButtonText: 'Iniciar sesión',
      })
      .then(() => {
        window.location.href = 'auth/login.html?fromReview=true';
      });
    } else {
      let currentUserName = `${currentUser.firstName} ${currentUser.lastName}`;
      let filtered = reviewsDB.filter(
        (rev) => rev.review.userName == currentUserName
      );
      renderReviewList(filtered);
    }
  } else {
    const filtered = reviewsDB.filter(
      (rev) => rev.review.productName === selected
    );
    renderReviewList(filtered);
  }
});

/*Funcion para enderizar las reseñas en la lista de reseñas*/
function renderReviewList(arr) {
  let reviewsHTML = '';
  arr.forEach((rev) => {
    reviewsHTML += rev.renderCard();
  });
  reviewlist.innerHTML = reviewsHTML;
}

/**Se carga la lista de productos en el select del formulario */
let productList;
window.addEventListener('DOMContentLoaded', async () => {
  productList = await getProdTemp();
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
formSubmit.addEventListener('click', async (e) => {
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
      const newReviewCard = new ReviewCard(
        await createReview(review.value, ratingValue, productName.value)
      );
      reviewsDB.push(newReviewCard);
      reviewlist.insertAdjacentHTML('afterbegin', newReviewCard.renderCard());
      filterValues.has(newReviewCard.review.productName)
        ? true
        : reviewFilter.insertAdjacentHTML(
            'beforeend',
            `<option>${newReviewCard.review.productName}</option>`
          );
      clearForm();
    }
  }
});
