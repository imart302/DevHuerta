import { LOGGED_USER_LS_KEY, BE_URL } from '../utils/constants';

async function getProdTemp() {
  const response = await fetch(`${BE_URL}/product`);
  const data = await response.json();
  return data;
}

/**Petición GET para la lista de reseñas */
async function getReviews() {
  try {
    const response = await fetch(`${BE_URL}/review`);
    if (response.status !== 302) {
      throw new Error('No se pudieron obtener los datos de la API');
    }
    const data = await response.json();
    return data;
  } catch (err) {
    //alert('Ocurrio un error al obtener los datos, estamos trabajando en ello');
    console.error(err);
  }
}

/**Petición POST para crear una reseña */
let currentUser = JSON.parse(localStorage.getItem(LOGGED_USER_LS_KEY));

async function createReview(reviewValue, ratingValue, productIdValue) {
  const postHeaders = new Headers();
  postHeaders.append('Content-Type', 'application/json');
  postHeaders.append('Authorization', `Bearer ${currentUser.token}`);
  const raw = JSON.stringify({
    review: reviewValue,
    rating: ratingValue,
    productId: productIdValue,
  });
  const requestOptions = {
    method: 'POST',
    headers: postHeaders,
    body: raw,
    redirect: 'follow',
  };

  try {
    const response = await fetch(`${BE_URL}/review`, requestOptions);
    if (response.status !== 201) {
      throw new Error('Error en el servidor al crear la reseña');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    //alert('No se pudo crear la reseña, intentelo mas tarde');
    console.error(error);
  }
}


async function removeReview(id) {
  const myHeaders = new Headers();
  myHeaders.append('Authorization', `Bearer ${currentUser.token}`);
  var raw = '';
  var requestOptions = {
    method: 'DELETE',
    headers: myHeaders,
    body: raw,
    redirect: 'follow',
  };
  try{
  const response = await fetch(`${BE_URL}/review/${id}`, requestOptions);
    if(response.status != 200){
      throw new Error("Error en el servidor, no se pudo eliminar la reseña");
    }
  } catch(err) {
    console.error(err);
  }
}

export { getProdTemp, getReviews, createReview, removeReview, currentUser };
