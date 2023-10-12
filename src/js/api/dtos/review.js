/**
 * Clase para crear la estructura esperada de las reseñas desde la APi
 */

export class Review {
  id = 0;
  user = '';
  category = '';
  product = '';
  ImgUrl = '';
  rating = 0;
  review = '';

  constructor(id, user, category, product, imgUrl, rating, review) {
    this.id = id;
    this.user = user;
    this.category = category;
    this.product = product;
    this.imgUrl = imgUrl;
    this.rating = rating;
    this.review = review;
  }
}
