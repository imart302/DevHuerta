const nameInput = document.getElementById('nameInput');
const phoneInput = document.getElementById('phoneInput');
const emailInput = document.getElementById('emailInput');
const messageInput = document.getElementById('messageInput');
const formBtn = document.getElementById('contactForm');

/**Si el -imput- esta vacio, agrega la clase de bootstrap is-invalid, si ya esta completo, la quita */
const isFilled = input => {
    if(input.value == ''){
        input.classList.add('is-invalid');
    } else {
        input.classList.remove('is-invalid');
    };
};

/**Si el email es invalido, agrega la clase de bootstrap is-invalid, si es valido, la quita */
const emailValidation = email => {
    const emailPattern = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/ ;
    if( !emailPattern.test(email.value) ){
        email.classList.add('is-invalid');
    } else {
        email.classList.remove('is-invalid'); 
    };
};


/**Eventos de los inputs en tiempo real */

nameInput.addEventListener('blur', () => isFilled(nameInput));

phoneInput.addEventListener('blur', () => isFilled(phoneInput));

emailInput.addEventListener('blur', () => emailValidation(emailInput));

messageInput.addEventListener('blur', () => isFilled(messageInput));
