import { PAGES, LOGGED_USER_LS_KEY } from '../utils/constants.js';
//const Shop = document.getElementById('about');

const NAVBAR_DOM = {
  dropdown: {
    list: document.getElementById('id-navbar-account-dropdown-list'),
    login: document.getElementById('id-navbar-account-dropdown-login'),
    logout: document.getElementById('id-navbar-account-dropdown-logout'),
  },
};

window.addEventListener('load', () => {
  const loc = document.location;
});

// Cuando se hace click en logout debe borrar el usuario de localStorage
NAVBAR_DOM.dropdown.logout.addEventListener('click', () => {
  localStorage.removeItem(LOGGED_USER_LS_KEY);
  NAVBAR_DOM.dropdown.login.classList.remove('d-none');
  NAVBAR_DOM.dropdown.logout.classList.add('d-none');
});

document.addEventListener('DOMContentLoaded', () => {
  const currentLocation = window.location.pathname;

  // Obtener todos los elementos de la barra de navegación
  const navLinks = document.querySelectorAll('.navbar-nav .nav-link');

  // Iterar sobre los enlaces y agregar la clase activa al enlace correspondiente
  navLinks.forEach((link) => {
    const linkPath = link.getAttribute('href');

    PAGES.forEach((page) => {
      if (currentLocation.includes(page) && linkPath.includes(page)) {
        link.classList.add('selector');
      }
    });
  });

  // Obtener el usuario logeado de local storage
  const loggedUser = localStorage.getItem(LOGGED_USER_LS_KEY);
  //console.log(loggedUser);
  if (loggedUser) {
    // No hay que mostrar login cuando hay un usuario logeado
    NAVBAR_DOM.dropdown.login.classList.add('d-none');
    NAVBAR_DOM.dropdown.logout.classList.remove('d-none');
  } else {
    // No hay que mostrar salir cuando no hay un usuario logeado
    NAVBAR_DOM.dropdown.login.classList.remove('d-none');
    NAVBAR_DOM.dropdown.logout.classList.add('d-none');
  }
});