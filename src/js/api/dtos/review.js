/**
 * Clase para crear la estructura esperada de las reseñas desde la APi
 */

export class Review {
  id = 0;
  userName = '';
  productName = '';
  ImgUrl = '';
  rating = 0;
  review = '';

  constructor(id, username, review, rating, productName, imgUrl) {
    this.id = id
    this.userName = username;
    this.productName = productName;
    this.imgUrl = imgUrl;
    this.rating = rating;
    this.review = review;
  }
}
