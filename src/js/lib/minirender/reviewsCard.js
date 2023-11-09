/**Clase para renderizar una nueva tarjeta de reseñas en la pagina de reseñas */
import { currentUser } from '../../api/reviews';

export class ReviewCard {
  review = null;

  constructor(review) {
    this.review = review;
  }

  /**Método que devuelve un string de formato html que genera la tarjeta de reseña en la lista de reseña */
  renderCard() {
    let stars = '';
    let starChecked = '<i class="bi bi-star-fill mx-1 checked"></i>';
    let starGray = '<i class="bi bi-star-fill mx-1"></i>';
    for (let i = 0; i < 5; i++) {
      i < this.review.rating ? (stars += starChecked) : (stars += starGray);
    }
    let background = 'normalBg';
    let editreview = '';
    if (!currentUser) {
      background = 'normalBg';
    } else {
      let currentUsername = `${currentUser.firstName} ${currentUser.lastName}`;
      background =
        currentUsername == this.review.userName ? 'myReview' : 'normalBg';
      editreview =
        currentUsername == this.review.userName
          ? `<hr/>
            <div class="d-flex justify-content-end p-0">
              <button class="dn-button-reviewCard btn btn-primary deleteBtn">
                <i class="bi bi-trash deleteBtn"></i>
                <!-- </button><button class="dn-button-reviewCard btn btn-primary updateBtn">
                <i class="bi bi-pencil-square updateBtn" ></i>
              </button> -->
            </div>`
          : '';
    }

    return `
        <div class="dn-review-card w-99 border d-flex flex-wrap m-1 p-1 ${background}" data-id="${this.review.id}">
          <div class="mx-auto my-auto card">
            <img class="dn-review-img card-img" src="${this.review.imgUrl}" alt="">
          </div>
          <div class="review-description card m-1 p-1 d-flex flex-column">
              <div class="review-desc-head d-flex">
                <p class="m-0 p-1"><b>Producto: ${this.review.productName}</b></p>
                <div class="rating-cont-2 m-0 p-1">
                  ${stars}
                </div>
              </div>
              <p class="m-0 p-1">Usuario: ${this.review.userName}</p>
              <div class="review-desc-body p-1">
                ${this.review.review}
              </div>
              ${editreview}
          </div>
        </div>
        `;
  }
}
