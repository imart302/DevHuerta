/**
 * Clase para crear la estructura esperada de las reseñas desde la APi
 */

export class Review {
  username = '';
  productName = '';
  ImgUrl = '';
  rating = 0;
  review = '';

  constructor(username, productName, imgUrl, rating, review) {
    this.username = username;
    this.productName = productName;
    this.imgUrl = imgUrl;
    this.rating = rating;
    this.review = review;
  }
}
