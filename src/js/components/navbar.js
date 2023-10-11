import { PAGES } from '../utils/constants.js';
const Shop = document.getElementById('about');

window.addEventListener('load', () => {
  const loc = document.location;
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
});
