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

const stubProducts = [
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
    2,
    'COSMETICO',
    60,
    lipBalmImg,
    'Labial de miel para hidratar tus labios',
    'Labial de miel',
    300,
    100,
    'g'
  ),
  new ProductDbDto(
    3,
    'COSMETICO',
    60,
    maskImg,
    'Mascarilla facial para hidratar el rostro',
    'Mascarilla facial',
    300,
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

/**
 * Obtiene los productos de la Api GET /api/products
 * @returns Product
 */
export async function getProducts() {
  return stubProducts;
}

/**
 * 
 * @param {NewProductDto} product 
 * @returns 
 */
export async function createProduct(product) {

  return new ProductDbDto(
    Math.floor(Math.random()*10000),
    product.category,
    product.gram,
    product.imgUrl,
    product.info,
    product.name,
    product.price,
    product.stock,
    product.typeGram
  )
}

/**
 * Obtiene los productos de la Api GET /api/products/week
 * @returns Product
 */
export async function getWeekProducts() {
  return stubWeekProductDb;
}

