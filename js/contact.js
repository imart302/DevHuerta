
const formBtn = document.getElementById('contactForm');

/**
 * Función para verificar el evento submit del formulario
 */
function testEvent(){
    formBtn.addEventListener("submit", (e) => {
        e.preventDefault();
        console.log('Formulario enviado');
    });
};

