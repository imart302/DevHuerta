import { LOGGED_USER_LS_KEY } from './utils/constants';
import './components/navbar.js';
import { deleteOrder, getOrders } from './api/orders.js';
import { OrderListItem } from './lib/minirender/orderListItem.js';

/**Obtenemos los elementos html donde mostraremos los datos */
const firstName = document.getElementById('firstName');
const lastName = document.getElementById('lastName');
const email = document.getElementById('email');
const orderContainer = document.getElementById('id-order-list');

/**Declaración del sweet alert */
const sweetAlertBtn = Swal.mixin({
  customClass: {
    confirmButton: 'btn btn-info',
  },
  buttonsStyling: false,
});

/**Función para obtener los datos del usuario */
async function getUser() {
  try {
    const user = await JSON.parse(localStorage.getItem(LOGGED_USER_LS_KEY));
    return user;
  } catch (err) {
    console.log(err);
  }
}

/**Función para agregar los datos del usuario a los elementos html correspondientes */
async function showData(user) {
  firstName.textContent = await user.firstName;
  lastName.textContent = await user.lastName;
  email.textContent = await user.email;

  //load the orders
  const orders = await getOrders();
  if (orders) {
    orders.forEach((order) => {
      const orderListItem = new OrderListItem(order);
      orderContainer.appendChild(
        orderListItem.renderDom((order) => {
          const listItem = orderContainer.querySelector(
            `#id-order-${order.id}`
          );
          deleteOrder(order.id).then((ok) => {
            orderContainer.removeChild(listItem);
            sweetAlertBtn.fire({
              title: 'Order eliminada',
              text: "Nos pondremos en contacto contigo",
              icon: 'success',
              confirmButtonText: 'Entendido',
            });
          });
        })
      );
    });
  }
}

/**Evento al cargar la pagina en caso de que el usuario no haya iniciado sesión*/
window.addEventListener('DOMContentLoaded', () => {
  getUser()
    .then((user) => showData(user))
    .catch(() => {
      sweetAlertBtn
        .fire({
          title: 'Inicia sesión para poder ver tus datos',
          icon: 'error',
          confirmButtonText: 'Iniciar sesión',
        })
        .then(() => {
          window.location.href = 'auth/login.html?fromAccount=true';
        });
    });
});
