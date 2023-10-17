import { Review } from './dtos/review.js';
import mielImg from '../../assets/imgs/miel_frasco.webp';

/**
 * Array de reseñas(fake) existentes, que serán llamadas al cargar la pagina
 *
 * sintaxis para crear nueva Review a partir de la clase reseña:
 * new Review(id, 'user', 'category', 'product', 'imgUrl', rating, 'review');
 */

let reviewList = [
  new Review(
    1,
    'antonio',
    'miel de 100ml',
    mielImg,
    3,
    'Lorem ipsum Nostrum atque quia soluta sequi'
  ),
  new Review(
    2,
    'ivan_mtz',
    'dulce de miel',
    mielImg,
    5,
    'Lorem ipsum Nostrum atque quia soluta sequi exercitationem dolores, consectetur corporis eius ipsaconsequuntur minus?'
  ),
  new Review(
    3,
    'lu-gallardo',
    'jabon 60g',
    mielImg,
    2,
    'Lorem ipsum, consectetur corporis eius ipsaconsequuntur minus? Pariatur?'
  ),
  new Review(
    4,
    'johann',
    'dulce de miel',
    mielImg,
    4,
    'Lorem ipsum Nostrum atque quia soluta sequi exercitationem dolores'
  ),
];

/**
 * Funcion para simular la petición de la lista de reseñas a la API
 */
export async function getReviews() {
  return reviewList;
}
