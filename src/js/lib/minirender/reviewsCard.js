/**Clase para renderizar una nueva tarjeta de reseñas en la pagina de reseñas */

export class ReviewCard {
  review = null;

  constructor(product) {
    this.product = product;
  }

  /**Método que devuelve un string de formato html que genera la tarjeta de reseña en la lista de reseña */
  renderCard() {
    let stars = '';
    let starChecked = '<i class="bi bi-star-fill mx-1 checked"></i>';
    let starGray = '<i class="bi bi-star-fill mx-1"></i>';
    for (let i = 0; i < 5; i++) {
      i < this.product.rating ? (stars += starChecked) : (stars += starGray);
    }

    return `
        <div class="dn-review-card w-99 border d-flex flex-wrap m-1 p-1" >
          <div class="mx-auto my-auto card">
            <img class="dn-review-img card-img" src="${this.product.imgUrl}" alt="">
          </div>
          <div class="review-description card m-1 p-1 d-flex flex-column">
              <div class="review-desc-head d-flex flex-wrap space-beetwen">
                <p class="m-0 p-1"><b>Producto: ${this.product.product}</b></p>
                <div class="rating-cont-2 text-center m-0 p-1">
                  ${stars}
                </div>
              </div>
              <p class="m-0 p-1">Usuario: ${this.product.user}</p>
              <div class="review-desc-body p-1">
                ${this.product.review}
              </div>
            </div>
        </div>
        `;
  }
}
