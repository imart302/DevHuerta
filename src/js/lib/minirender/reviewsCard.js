/**Clase para renderizar una nueva tarjeta de reseñas en la pagina de reseñas */

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

    return `
        <div class="dn-review-card w-99 border d-flex flex-wrap m-1 p-1" >
          <div class="mx-auto my-auto card">
            <img class="dn-review-img card-img" src="${this.review.imgUrl}" alt="">
          </div>
          <div class="review-description card m-1 p-1 d-flex flex-column">
              <div class="review-desc-head d-flex">
                <p class="m-0 p-1"><b>Producto: ${this.review.product}</b></p>
                <div class="rating-cont-2 m-0 p-1">
                  ${stars}
                </div>
              </div>
              <p class="m-0 p-1">Usuario: ${this.review.user}</p>
              <div class="review-desc-body p-1">
                ${this.review.review}
              </div>
            </div>
        </div>
        `;
  }
}
