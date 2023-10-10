/* Se importa la clase que renderiza las tarjetas de reseñas */
import { ReviewCard } from './lib/minirender/reviewsCard.js';

const stars = document.querySelectorAll('.stars');
const formSubmit = document.getElementById('reviewSubmit');
const reviewlist = document.getElementById('review-list');
/**Simulación de usuario logeado en la pagina */
const User = 'Antoniolm386';
localStorage.setItem('currentUser', User);

/* Objeto de los inputs del formulario de reseñas */
const formInputs = {
	productCategory: document.getElementById('productCategory'),
	productName: document.getElementById('productName'),
	rating: document.getElementById('ratingContainer'),
	review: document.getElementById('reviewInput'),
};

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

/**Funcion para validar los inputs, recibe el elemento html, y el valor invalido, retorna 'true o flase' */
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

/**Array de reseñas, con dos previamente cargadas */
let reviewsArray = [
	/* sintaxis. ReviewCard('usuario', 'producto', 'categoría', 'reseña', 'url de la imagen') */
	new ReviewCard(
		'lu-gallardo',
		'miel',
		'líquidos',
		1,
		'Lorem ipsum Nostrum atque quia soluta sequi',
		'assets/imgs/miel_frasco.webp'
	),
	new ReviewCard(
		'ivan-Martinez',
		'jabón1',
		'liquidos',
		2,
		'Lorem ipsum Nostrum atque quia soluta sequi exercitationem dolores, consectetur corporis eius ipsaconsequuntur minus? Pariatur?',
		'assets/imgs/miel_frasco.webp'
	),
	new ReviewCard(
		'johan',
		'Dulces',
		'liquidos',
		2,
		'Lorem ipsum Nostrum atque quia soluta sequi exercitationem dolores',
		'assets/imgs/miel_frasco.webp'
	),
];

/**Renderizado de las tarjetas de reseñas del 'reviewsArray' en el html */
reviewsArray.forEach((review) => {
	reviewlist.insertAdjacentHTML('beforeend', review.renderCard(review));
});

function createReview(review) {
	reviewlist.insertAdjacentHTML('beforeend', review.renderCard());
}

/**Eventos del submit al agregar reseñas */
formSubmit.addEventListener('click', (e) => {
	e.preventDefault();
	let isFormValid =
		isProductValid && isRatingComplete && isReviewFill ? true : false;
	if (!isFormValid) {
		formSubmit.classList.add('is-invalid');
	} else {
		const newReview = new ReviewCard(
			localStorage.getItem('currentUser'),
			formInputs.productName.value,
			formInputs.productCategory.value,
			ratingValue,
			formInputs.review.value,
			'assets/imgs/miel_frasco.webp'
		);
		reviewsArray.push(newReview);
		createReview(newReview);
		clearForm();
	}
});
