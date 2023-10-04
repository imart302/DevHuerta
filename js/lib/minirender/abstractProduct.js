
/**
 * Clase para gestionar renderizados
 * de tarjetas de productos
 * usar esta como base
 */

export class AbstractProduct {
  imgUrl = '';
  title = '';
  description = '';

  constructor(title, description, imgUrl) {
    this.description = description;
    this.imgUrl = imgUrl;
    this.title = title
  }

  renderStr() {
    return ``
  }

}
