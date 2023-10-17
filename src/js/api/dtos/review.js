/**
 * Clase para crear la estructura esperada de las reseñas desde la APi
 */

export class Review {
  id = 0;
  user = '';
  product = '';
  ImgUrl = '';
  rating = 0;
  review = '';

  constructor(id, user, product, imgUrl, rating, review) {
    this.id = id;
    this.user = user;
    this.product = product;
    this.imgUrl = imgUrl;
    this.rating = rating;
    this.review = review;
  }
}
