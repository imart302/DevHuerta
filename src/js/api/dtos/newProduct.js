/**
 * Estructura para mandar a la API
 * para que nos cree un nuevo producto
 */
export class NewProductDto {
  category = '';
  gram = 0;
  imgUrl = '';
  info = '';
  name = '';
  price = 0;
  stock = 0;
  typeGram = '';

  constructor(category, gram, imgUrl, info, name, price, stock, typeGram) {
    this.category = category;
    this.gram = gram;
    this.imgUrl = imgUrl;
    this.info = info;
    this.name = name;
    this.price = price;
    this.stock = stock;
    this.typeGram = typeGram;
  }
}
