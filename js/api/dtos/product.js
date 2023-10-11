/**
 * Estructura esperada de la respuesta de la
 * API de un producto
 */
export class Product {
	id = 0;
	category = '';
	gram = 0;
	imgUrl = '';
	info = '';
	name = '';
	price = 0;
	stock = 0;
	typeGram = '';

	constructor(id, category, gram, imgUrl, info, name, price, stock, typeGram) {
		(this.id = id),
			(this.category = category),
			(this.gram = gram),
			(this.imgUrl = imgUrl),
			(this.info = info),
			(this.name = name),
			(this.price = price),
			(this.stock = stock),
			(this.typeGram = typeGram);
	}
}
