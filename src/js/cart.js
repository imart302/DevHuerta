import { CartItem } from './lib/minirender/cartItem';
const CART_DOM = {
  cartContainer: document.getElementById('id-cartItemContainer'),
};

function renderLocalStorageCart() {
  CART_DOM.cartContainer.innerHTML = '';
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
  const totalCart=cartClean.reduce(
    (total, actualItemCart) =>
      (total += actualItemCart.product.price * actualItemCart.quantity),
    0
  );

  const Totaldiv= document.getElementById('Total')
  Totaldiv.innerHTML = (totalCart);

  cartClean.forEach((cartItem) => {
    const cartRenderItem = new CartItem(cartItem.product, cartItem.quantity);
    CART_DOM.cartContainer.appendChild(
      cartRenderItem.renderDOM(renderLocalStorageCart, cartObject)
    );
  });
}

window.addEventListener('load', () => {
  renderLocalStorageCart();
});
