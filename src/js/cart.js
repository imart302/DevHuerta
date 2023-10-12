import './components/navbar.js';
console.log('link');

const CARD_SECTION = document.getElementById('profiles');



const createCard = () => {
    const card = document.createElement('div');
    card.classList.add('cart','dn-container');
    return card;
}

const createImgDiv = () => {
	const Imgcard = document.createElement('div')
    Imgcard.classList.add('img-container');

	return Imgcard;
}

const createDesDiv = () => {
	const DescripcionCard = document.createElement('div')
	DescripcionCard.classList.add('Descripcion', 'Descripcion-container');

	return DescripcionCard;
}

const createImgElements = () => {
	const ImgElements = {
		imgUrl: document.createElement('img'),
	}
	return ImgElements;
}



const createDescription = () => {
    const userElements = { 
        name:document.createElement('p'),
        price:document.createElement('p'),
        info:document.createElement('p'),
        gram: document.createElement('p'),
        stock:document.createElement('p'),
        button:document.createElement('button')
    }
    userElements.name.classList.add('dn-mn-product-list-desc');
    userElements.price.classList.add('dn-mn-product-list-desc');
    userElements.gram.classList.add('dn-mn-product-list-desc');
    userElements.stock.classList.add('dn-mn-product-list-desc');
    userElements.button.classList.add('dn-btn');
    userElements.button.textContent = 'Eliminar';

    
    

    return userElements;
}
const PopulateImg = (product,ImgElements) => {	
	// Configura la imagen
	ImgElements.imgUrl.src = product.imgUrl || '';
	ImgElements.imgUrl.alt = `Imagen de ${product.category || 'No disponible'}`;

	return ImgElements;
}


const populateElements = (product, userElements) => {
    // Asigna directamente los valores del producto a los elementos
    userElements.name.textContent = `Name: ${product.name || 'No disponible'}`;
    userElements.price.textContent = `Price: ${product.price || 'No disponible'}`;
    userElements.info.textContent = `Info: ${product.info || 'No disponible'}`;
    userElements.gram.textContent = `Gramos: ${product.gram || 'No disponible'}`;
    userElements.stock.textContent = `Stock: ${product.stock || 'No disponible'}`;


    return userElements;
}


const removeFromCart = (productId) => {
  // Obtener el carrito actual desde localStorage
  const cartStorage = localStorage.getItem('cart');

  if (cartStorage) {
      try {
          // Parsear el carrito
          const parsedCart = JSON.parse(cartStorage);

          // Encontrar el índice del producto en el carrito basado en el productId
          const productIndex = parsedCart.findIndex(cartItem => cartItem.product.id === productId);

          // Si el producto existe en el carrito, eliminarlo
          if (productIndex !== -1) {
              parsedCart.splice(productIndex, 1);

              // Actualizar el carrito en localStorage con el nuevo carrito sin el producto eliminado
              localStorage.setItem('cart', JSON.stringify(parsedCart));

              // Actualizar la interfaz de usuario si es necesario
              createAndDisplayCartCard();
          } else {
              console.error('Producto no encontrado en el carrito.');
          }
      } catch (error) {
          console.error('Error al analizar JSON del carrito:', error);
      }
  }
};


const createAndDisplayCartCard = async () => {
    console.log("cola")
    const cartStorage = localStorage.getItem('cart');

    try {
        CARD_SECTION.innerHTML=""
        const parsedCart = JSON.parse(cartStorage);
				parsedCart.forEach(cartItem => {
				
          

					const card = createCard();
					const DescriptionCard =createDesDiv()
					const Imgcard=createImgDiv();


					const userElements = createDescription();
					const ImgElements=createImgElements();

          userElements.button.addEventListener('click', () => {
            const productIdToRemove = cartItem.product.id;
            removeFromCart(productIdToRemove)
        });

					const elementsWithData = populateElements(cartItem.product, userElements);
					const ImgWithElement = PopulateImg(cartItem.product,ImgElements)
					
					Imgcard.append(ImgWithElement.imgUrl)
					// DescriptionCard.append(elementsWithData.id, elementsWithData.category, elementsWithData.gram)
        DescriptionCard.append(elementsWithData.name,elementsWithData.price,elementsWithData.info, elementsWithData.gram,elementsWithData.stock,elementsWithData.button)

					// Agregar elementos a la tarjeta
					card.append(Imgcard)
					card.append(DescriptionCard);
					
					// Agregar la tarjeta al contenedor de perfiles
					CARD_SECTION.append(card);
				});
      } catch (error) {
        console.error('Error al analizar JSON del carrito:', error);
    }
  }


  const totalCost = () => {
    const cartStorage = localStorage.getItem('cart');
    const TotalDiv = document.getElementById('Total');

    if (cartStorage) {
        try {
            const parsedCart = JSON.parse(cartStorage);
            let totalPrice = 0;

            parsedCart.forEach(cartItem => {
                totalPrice += parseFloat(cartItem.product.price) * (cartItem.quantity) || 0;

            });

            TotalDiv.textContent = ` ${totalPrice.toFixed(2)} MXN`; // Mostrar el total
        } catch (error) {
            console.error('Error al analizar JSON del carrito:', error);
        }
    }
}


  document.addEventListener('DOMContentLoaded', async () => {
    await createAndDisplayCartCard();
    totalCost();
  });

  // document.getElementById('removeProductButton').addEventListener('click', () => {
  //   const productIdToRemove = 1; // Reemplaza con el ID del producto que deseas eliminar
  //   removeFromCart(productIdToRemove);
  // });

// //   const storedPokemonId = localStorage.getItem("pokemonId");

// const pokemon = await FetchPoke(storedPokemonId); 
    
// const card = createCard();
// const pokeElements = createDescription();

// const elementsWithData = populateElements(pokemon, pokeElements);

// // Agregar elementos a la tarjeta
// card.append(elementsWithData.id, elementsWithData.name, elementsWithData.height, elementsWithData.weight);

// // Agregar la tarjeta al contenedor de perfiles
// CARD_SECTION.append(card);

// ...


// ...


// ...
