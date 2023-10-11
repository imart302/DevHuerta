/**
 * Funciones para llamar a todos los
 * servicios de la API para productos
 */

import { Product } from './dtos/product.js';
import lipBalmImg from '../../assets/imgs/lip_balm.webp';
import maskImg from '../../assets/imgs/mascarilla.webp';
import propolioImg from '../../assets/imgs/propolio.webp';
import honeyImg from '../../assets/imgs/honey1.webp';

const stubProducts = [
  new Product(
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
  new Product(
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
  new Product(
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
  new Product(
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
  new Product(
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
  new Product(
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
