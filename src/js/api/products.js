/**
 * Funciones para llamar a todos los
 * servicios de la API para productos
 */

import { ProductDbDto } from './dtos/product.js';
import lipBalmImg from '../../assets/imgs/lip_balm.webp';
import maskImg from '../../assets/imgs/mascarilla.webp';
import propolioImg from '../../assets/imgs/propolio.webp';
import honeyImg from '../../assets/imgs/honey1.webp';
import { NewProductDto } from './dtos/newProduct.js';
import { BE_URL } from '../utils/constants.js';
import { LOGGED_USER_LS_KEY } from '../utils/constants.js';

//HAce los elementos individuales
const stubWeekProductDb = [
  new ProductDbDto(
    1,
    'COSMETICO',
    40,
    lipBalmImg,
    'Labial de miel para hidratar tus labios',
    'Labial de miel',
    250,
    100,
    'g'
  ),
  new ProductDbDto(
    4,
    'COSMETICO',
    100,
    maskImg,
    'Mascarilla facial para hidratar el rostro',
    'Mascarilla facial',
    450,
    190,
    'g'
  ),
  new ProductDbDto(
    5,
    'DULCE',
    60,
    propolioImg,
    'Perlas de miel con propolio para la resequedad en la garganta',
    'Perlas de miel',
    80,
    190,
    'g'
  ),
  new ProductDbDto(
    6,
    'Miel',
    1,
    honeyImg,
    'Miel de abeja 100% natural',
    'Miel',
    150,
    190,
    'l'
  ),
];


let loggedUserVer;
if (localStorage.getItem(LOGGED_USER_LS_KEY)){
   loggedUserVer =  'Bearer ' + JSON.parse(localStorage.getItem(LOGGED_USER_LS_KEY)).token;
}



/**
 * Obtiene los productos de la Api GET /api/products
 * @returns Product
 */
export async function getProducts() {
  var requestOptions = {
    method: 'GET',
    redirect: 'follow',
  };
  try {
    let getProductsResponse = await fetch(`${BE_URL}/product`, requestOptions);
    let productsList = await getProductsResponse.json();

    const productsDto = productsList.map((productDb) => {
      return new ProductDbDto(
        productDb.id, 
        productDb.category.name,
        productDb.gram,
        productDb.imgUrl,
        productDb.info,
        productDb.name,
        productDb.price,
        productDb.stock,
        productDb.typeGram
      );
    });

    return productsDto;
  } catch (error) {
    console.log('Something Went Wrong!', error);
  }
}

/**
 *
 * @param {NewProductDto} product
 * @returns
 */
export async function createProduct(product) {

  
  var myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');
  myHeaders.append(
    'Authorization',
    loggedUserVer
  );

  var raw = JSON.stringify(product);

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow',
  };
  try {
    let createdPoductResponse = await fetch(
      `${BE_URL}/product`,
      requestOptions
    );
    let createdProduct = await createdPoductResponse.json();
    return createdProduct;
  } catch (error) {
    let val = !loggedUserVer ? "Administrator Login Required": `Something went wrong: ${error}`;
    console.log(val);
  }
}

/**
 * Obtiene los productos de la Api GET /api/products/week
 * @returns Product
 */
export async function getWeekProducts() {
  return stubWeekProductDb;
}

//Delete and modify

/**
 * Elimina productos de la Api atraves de DELETE method /api/products/
 * @returns HTTP response
 */
export async function deleteProduct(id) {
  var myHeaders = new Headers();
  myHeaders.append(
    'Authorization',
    loggedUserVer
    );

  var raw = '';

  var requestOptions = {
    method: 'DELETE',
    headers: myHeaders,
    body: raw,
    redirect: 'follow',
  };
  

  try {
    let deleteResponse = await fetch(`${BE_URL}/product/${id}`, requestOptions);
    // return response;
    return deleteResponse;
  } catch (error) {
    let val = !loggedUserVer ? "Administrator Login Required": `Unable to Delete: ${error}`
    console.log(val);
  }
}

/**
 * Fetch con método PUT, actualiza la base de datos
 * @param {Input ID from modal} id
 * @param {NewProductDto} product
 */
export async function updateProduct(id, product) {
  var myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');
  myHeaders.append(
    'Authorization',
    loggedUserVer
    );

  var raw = JSON.stringify(product);

  var requestOptions = {
    method: 'PUT',
    headers: myHeaders,
    body: raw,
    redirect: 'follow',
  };

  try {
    let updateResponse = await fetch(`${BE_URL}/product/${id}`, requestOptions);
    let updatedProduct = await updateResponse.json();
    return updatedProduct;
  } catch {
    let val = !loggedUserVer ? "Administrator Login Required": `Something went wrong: ${error}`
    console.log(val);
  }
}
