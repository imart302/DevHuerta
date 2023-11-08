/**
 * Clase para crear la estructura esperada de las reseñas desde la APi
 */

export class Review {
  id = 0;
  username = '';
  productName = '';
  ImgUrl = '';
  rating = 0;
  review = '';

  constructor(id, username, productName, imgUrl, rating, review) {
    this.id = id;
    this.username = username;
    this.productName = productName;
    this.imgUrl = imgUrl;
    this.rating = rating;
    this.review = review;
  }
}
