/* Se importa la clase que renderiza las tarjetas de reseñas */
import { ReviewCard } from "/js/lib/minirender/reviewsCard.js";

const stars = document.querySelectorAll('.stars');
const formSubmit = document.getElementById('reviewSubmit');
const reviewlist = document.getElementById('review-list');

/* Objeto de los inputs del formulario de reseñas */
const formInputs = {
    productCategory: document.getElementById('productCategory'),
    productName: document.getElementById('productName'),
    rating: document.getElementById('ratingContainer'),
    review: document.getElementById('reviewInput')
}

/* Evento para que el imput de rating sea dinamico -------------*/
let ratingValue = 0;
stars.forEach((star, index) => {
    star.addEventListener('click', () => {
        for (let i = 0; i <= index; i++) {
            stars[i].classList.add('checked');
        };
        for (let i = index + 1; i < stars.length; i++) {
            stars[i].classList.remove('checked');
        };
        ratingValue = index + 1;
    });
});


/* Validaciones de los inputs en tiempo real------------- */
/**Categoria del producto */
formInputs.productCategory.addEventListener('blur', () => {
    if (formInputs.productCategory.value == 'Categoria') {
        formInputs.productCategory.classList.add('is-invalid');
        formInputs.productName.setAttribute('disabled', '');
    } else {
        formInputs.productCategory.classList.remove('is-invalid');
        formInputs.productName.removeAttribute('disabled');
    }
});

/**Nombre del producto */
let isProductValid = false;
formInputs.productName.addEventListener('blur', () => {
    if (formInputs.productName.value == 'Producto') {
        formInputs.productName.classList.add('is-invalid');
        isProductValid = false;
    } else {
        formInputs.productName.classList.remove('is-invalid');
        isProductValid = true;
    }
});

/**Evento del rating */
let isRatingComplete = false;
formSubmit.addEventListener('click', () => {
    if (ratingValue == 0) {
        formInputs.rating.classList.add('is-invalid');
        isRatingComplete = false;
    } else {
        formInputs.rating.classList.remove('is-invalid');
        isRatingComplete = true;
    }
});

/**Evento del textarea */
let isReviewFill = false;
formInputs.review.addEventListener('blur', () => {
    if (formInputs.review.value == '') {
        formInputs.review.classList.add('is-invalid');
        isReviewFill = false;
    } else {
        formInputs.review.classList.remove('is-invalid');
        isReviewFill = true;
    };
});


/**Funcion para  limpiar el formulario*/
const clearForm = () => {
    formInputs.productCategory.value = 'Categoria';
    formInputs.productName.value = 'Producto';
    formInputs.review.value = '';
    stars.forEach(star => star.classList.remove('checked'));
    ratingValue = 0;
};

/**Inicia la logica de la lista de reseñas */
let reviewsArray = [
    new ReviewCard('toño', 'miel', 'liquidos', 1, 'Lorem ipsum Nostrum atque quia soluta sequi exercitationem dolores, consectetur corporis eius ipsaconsequuntur minus? Pariatur?', 'assets/imgs/miel_frasco.webp'),
    new ReviewCard('ivan', 'jabon1', 'liquidos', 2, 'Lorem ipsum Nostrum atque quia soluta sequi exercitationem dolores, consectetur corporis eius ipsaconsequuntur minus? Pariatur?', 'assets/imgs/miel_frasco.webp')
];


/**Eventos del submit */
formSubmit.addEventListener('click', (e) => {
    e.preventDefault;
    let isFormValid = (isProductValid && isRatingComplete && isReviewFill) ? true : false;
    if (!isFormValid) {
        formSubmit.classList.add('is-invalid');
    } else {
        const newReview = new ReviewCard('toño', formInputs.productName.value, formInputs.productCategory.value, ratingValue, formInputs.review.value, 'assets/imgs/miel_frasco.webp');
        reviewsArray.push(newReview);
        reviewlist.insertAdjacentHTML('beforeend', newReview.renderCard(newReview));
        clearForm();
        formSubmit.classList.remove('is-invalid');
    }
});




reviewsArray.forEach(review => {
    reviewlist.insertAdjacentHTML('beforeend', review.renderCard(review))
})

