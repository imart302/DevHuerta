
/**Clase a partir de la cual se crean las targetas de noticias 
 * que se muestran al final de la pagina de inicio */

export class NewCard {
    title = '';
    abstract = '';
    date = '';
    imgURL = '';
    url = '';

    constructor(title, abstract, date, imgURL, url){
        this.title = title;
        this.abstract = abstract;
        this.date = date;
        this.imgURL = imgURL;
        this.url = url;
    };

    /* Regresa la tarjeta de la noticia en d¿formato html para ser insertado en el index.html*/
    renderCard(){
        return `
        <div class="card m-4 position-relative  dn-news-card">
            <p class="mt-3 dn-p-date p-1">${this.date}</p>
            <img class="w-100 card-img-top" src="${this.imgURL}" alt="">
            <div class="card-body d-flex flex-column">
                <h3 class="card-title">${this.title}</h3>
                <p class="card-text my-3">${this.abstract}</p>
                <a href="${this.url}" class="d-block btn btn-secondary mx-5 mt-auto ">leer mas</a>
            </div>
        </div>
        `
    }
}