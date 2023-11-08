import { LOGGED_USER_LS_KEY } from '../utils/constants';

const URL = 'http://localhost:8081/api/review';

const URL_PRODUCT = 'http://localhost:8081/api/product';
async function getProdTemp() {
    const response = await fetch(URL_PRODUCT);
    const data = await response.json();
    return data;
}

/**Petición GET para la lista de reseñas */
async function getReviews() {
  try {
    const response = await fetch(URL);
    if (response.status !== 302) {
      throw new Error('No se pudieron obtener los datos de la API');
    }
    const data = await response.json();
    return data;
  } catch (err) {
    alert('Ocurrio un error al obtener los datos, estamos trabajando en ello');
    console.error(err);
  }
}


/**Petición POST para crear una reseña */
let currentUser = JSON.parse(localStorage.getItem(LOGGED_USER_LS_KEY));
let postHeaders = new Headers();
postHeaders.append('Content-Type', 'application/json');
postHeaders.append('Authorization', `Bearer ${currentUser.token}`);

async function createReview(reviewValue, ratingValue, productIdValue) {
  let raw = JSON.stringify({
    review: reviewValue,
    rating: ratingValue,
    productId: productIdValue,
  });
  let requestOptions = {
    method: 'POST',
    headers: postHeaders,
    body: raw,
    redirect: 'follow',
  };

  try {
    const response = await fetch(URL, requestOptions);
    if(response.status !== 201){
      throw new Error("Error en el servidor al crear la reseña")
    }
    const data = await response.json();
    return data;
  } catch (error) {
    alert("No se pudo crear la reseña, intentelo mas tarde");
    console.error(error)
  }
}

export {
  getProdTemp,
  getReviews,
  createReview,
  currentUser
}