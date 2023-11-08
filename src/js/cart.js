import { CartItem } from './lib/minirender/cartItem.js';
import { swalWithBootstrapButtons } from './utils/sweetAlert.js';
import { LOGGED_USER_LS_KEY } from './utils/constants.js';
import './components/navbar.js';
import { CreateOrderDto, CreateOrderItem } from './api/dtos/createOrder.js';
import { createOrder } from './api/orders.js';

const CART_DOM = {
  cartContainer: document.getElementById('id-cartItemContainer'),
  cartInfoContainer: document.getElementById('id-cart-info-container'),
  cartEmptyContainer: document.getElementById('id-empty-cart-container'),
  btnConfirmBuy: document.getElementById('id-btn-confirm-buy'),

  finishBuyModal: {
    inputs: {
      cardNumber: document.getElementById('id-input-card-number'),
      cardCVV: document.getElementById('id-input-card-cvv'),
      state: document.getElementById('id-input-state'),
      city: document.getElementById('id-input-city'),
      address: document.getElementById('id-input-address'),
      number: document.getElementById('id-input-number'),
      postalCode: document.getElementById('id-input-postal-code'),
      contactPhone: document.getElementById('id-input-phone'),
    },
    btnFinish: document.getElementById('id-btn-finish-buy'),
    modal: new bootstrap.Modal(document.getElementById('id-modal-finish-buy'), {
      backdrop: true,
    }),
    cleanModal: function () {
      Object.keys(CART_DOM.finishBuyModal.inputs).forEach((inputKey) => {
        const input = CART_DOM.finishBuyModal.inputs[inputKey];
        input.value = '';
      });
    },
  },
};

/**
 * Establece evento de escucha de cada input
 * del modal de confirmación para establecer
 * su respectiva clase
 */
Object.keys(CART_DOM.finishBuyModal.inputs).forEach((inputKey) => {
  const input = CART_DOM.finishBuyModal.inputs[inputKey];

  input.addEventListener('input', () => {
    if (input.value) {
      input.classList.remove('is-invalid');
    } else {
      input.classList.add('is-invalid');
    }
  });
});

/**
 * Valida que todos los campos del modal
 * de confirmar compra sean correctos
 * @returns
 */
function validateFinishModal() {
  let badRequest = false;
  Object.keys(CART_DOM.finishBuyModal.inputs).forEach((inputKey) => {
    const input = CART_DOM.finishBuyModal.inputs[inputKey];

    if (!input.value) {
      input.classList.add('is-invalid');
      badRequest = true;
    }

    if (
      inputKey === 'cardNumber' &&
      (input.value.length !== 16 || input.value < 0)
    ) {
      input.classList.add('is-invalid');
      badRequest = true;
    }

    if (
      inputKey === 'cardCVV' &&
      (input.value.length !== 3 || input.value < 0)
    ) {
      input.classList.add('is-invalid');
      badRequest = true;
    }

    if (
      inputKey === 'postalCode' &&
      (input.value.length !== 5 || input.value < 0)
    ) {
      input.classList.add('is-invalid');
      badRequest = true;
    }

    if (
      inputKey === 'contactPhone' &&
      (input.value.length !== 10 || input.value < 0)
    ) {
      input.classList.add('is-invalid');
      badRequest = true;
    }
  });

  return !badRequest;
}

/**
 * Cuando no hay nada en el carrito
 * establece una vista de carrito vació
 */
function viewCartEmpty() {
  CART_DOM.cartInfoContainer.classList.add('d-none');
  CART_DOM.cartEmptyContainer.classList.remove('d-none');
}

/**
 * Cuando hay cosas en el carrito establece
 * la información del carrito visible
 */
function viewCartNotEmpty() {
  CART_DOM.cartInfoContainer.classList.remove('d-none');
  CART_DOM.cartEmptyContainer.classList.add('d-none');
}

/**
 * Funcion auxiliar para renderizar el total
 * de la compra en el DOM Itera sobre todo el
 * carrito en local storage y calcula la suma
 * @returns
 */
function renderTotalShop() {
  const totalDiv = document.getElementById('Total');

  const cart = localStorage.getItem('cart');
  if (!cart) {
    return;
  }

  const cartObject = JSON.parse(cart);
  const cartClean = cartObject.reduce((accumulator, currentValue) => {
    const item = accumulator.find(
      (cartItem) => cartItem.product.id === currentValue.product.id
    );
    if (item) {
      item.quantity += currentValue.quantity;
    } else {
      accumulator.push(currentValue);
    }
    return accumulator;
  }, []);

  const totalCart = cartClean.reduce(
    (total, actualItemCart) =>
      (total += actualItemCart.product.price * actualItemCart.quantity),
    0
  );

  totalDiv.textContent = ` $${totalCart} MXN`;
}

/**
 * Renderiza todos los items del cart
 * en el local storage en su respectivo
 * contenedor
 * @returns
 */
function renderLocalStorageCart() {
  CART_DOM.cartContainer.innerHTML = '';
  const cart = localStorage.getItem('cart');
  if (!cart) {
    viewCartEmpty();
    return;
  } else {
    viewCartNotEmpty();
  }
  const cartObject = JSON.parse(cart);
  const cartClean = cartObject.reduce((accumulator, currentValue) => {
    const item = accumulator.find(
      (cartItem) => cartItem.product.id === currentValue.product.id
    );
    if (item) {
      item.quantity += currentValue.quantity;
    } else {
      accumulator.push(currentValue);
    }
    return accumulator;
  }, []);

  if (cartClean.length == 0) {
    viewCartEmpty();
  } else {
    viewCartNotEmpty();
  }
  const totalCart = cartClean.reduce(
    (total, actualItemCart) =>
      (total += actualItemCart.product.price * actualItemCart.quantity),
    0
  );

  const Totaldiv = document.getElementById('Total');
  Totaldiv.textContent = ` $${totalCart} MXN`;

  cartClean.forEach((cartItem) => {
    const cartRenderItem = new CartItem(cartItem.product, cartItem.quantity);
    CART_DOM.cartContainer.appendChild(
      cartRenderItem.renderDOM(
        renderLocalStorageCart,
        cartObject,
        renderTotalShop
      )
    );
  });
}

/**
 * Cuando se procede a confirmar compra
 * primero verifica si hay un usuario
 * si no, re-direcciona a login, en otro
 * caso abre el modal de confirmar compra
 */
CART_DOM.btnConfirmBuy.addEventListener('click', () => {
  const loggedUser = localStorage.getItem(LOGGED_USER_LS_KEY);
  if (!loggedUser) {
    swalWithBootstrapButtons
      .fire({
        title: 'Inicia sesión para continuar',
        icon: 'error',
        confirmButtonText: 'Entendido',
      })
      .then(() => {
        window.location.href = 'auth/login.html?fromCart=true';
      });

    return;
  }

  CART_DOM.finishBuyModal.modal.show();
});

/**
 * Cuando se presiona finalizar compra
 * valida los campos, si todo es correcto
 * obtiene los valores del form de confirmación
 * y procede a la compra
 */
CART_DOM.finishBuyModal.btnFinish.addEventListener('click', () => {
  if (validateFinishModal()) {
    const buyInfo = Object.keys(CART_DOM.finishBuyModal.inputs).reduce(
      (info, actualKey) => {
        return {
          ...info,
          [actualKey]: CART_DOM.finishBuyModal.inputs[actualKey].value,
        };
      },
      {}
    );

    const cart = localStorage.getItem('cart');

    const cartObject = JSON.parse(cart);
    const cartClean = cartObject.reduce((accumulator, currentValue) => {
      const item = accumulator.find(
        (cartItem) => cartItem.product.id === currentValue.product.id
      );
      if (item) {
        item.quantity += currentValue.quantity;
      } else {
        accumulator.push(currentValue);
      }
      return accumulator;
    }, []);

    const totalCart = cartClean.reduce(
      (total, actualItemCart) =>
        (total += actualItemCart.product.price * actualItemCart.quantity),
      0
    );

    const orderItems = cartClean.map((cartItem) => {
      return new CreateOrderItem(cartItem.product.id, cartItem.quantity);
    });

    const orderDto = new CreateOrderDto(
      `${buyInfo.state},${buyInfo.city},${buyInfo.postalCode},${buyInfo.address}`,
      totalCart,
      orderItems
    );

    createOrder(orderDto).then((orderId) => {
      swalWithBootstrapButtons.fire({
        title: 'Orden creada',
        text: `El id de su orden es ${orderId}`,
        icon: 'success',
        confirmButtonText: 'Entendido'
      });
    });

    CART_DOM.finishBuyModal.cleanModal();
    CART_DOM.finishBuyModal.modal.hide();
    localStorage.removeItem('cart');
    renderLocalStorageCart();
  }
});

/**
 * Al inicio se hace render los items en el
 * carrito
 */
window.addEventListener('load', () => {
  renderLocalStorageCart();
});
