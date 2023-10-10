import './components/navbar.js';

const formBtn = document.getElementById('contactForm');

/**Se ha usado un objeto para que sea mas fácil su verificación en el evento del submit */
const inputs = {
	name: document.getElementById('nameInput'),
	phone: document.getElementById('phoneInput'),
	email: document.getElementById('emailInput'),
	message: document.getElementById('messageInput'),
};

/**Si el email es invalido, agrega la clase de bootstrap 'is-invalid', si es valido, la quita */
const emailValidation = (email) => {
	const emailPattern = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
	!emailPattern.test(email.value)
		? email.classList.add('is-invalid')
		: email.classList.remove('is-invalid');
};

/**Eventos de los inputs en tiempo real */
inputs.name.addEventListener('blur', () => {
	inputs.name.value == ''
		? inputs.name.classList.add('is-invalid')
		: inputs.name.classList.remove('is-invalid');
});

inputs.phone.addEventListener('blur', () => {
	String(inputs.phone.value).length === 10
		? inputs.phone.classList.remove('is-invalid')
		: inputs.phone.classList.add('is-invalid');
});

inputs.email.addEventListener('blur', () => emailValidation(inputs.email));

inputs.message.addEventListener('blur', () => {
	inputs.message.value == ''
		? inputs.message.classList.add('is-invalid')
		: inputs.message.classList.remove('is-invalid');
});

/**Comprueba que los inputs del form no tengan la clase 'is-invalid' y que no estén vacíos */
formBtn.addEventListener('submit', (e) => {
	e.preventDefault();
	let completedForm = true;
	Object.values(inputs).forEach((input) => {
		if (input.classList.contains('is-invalid') || input.value == '') {
			completedForm = false;
		}
	});
	if (completedForm) {
		alert('Formulario enviado!');
		Object.values(inputs).forEach((input) => (input.value = ''));
	} else {
		alert(
			'Por favor verifique que sus datos estén correctos y que todos los campos estén llenos.'
		);
	}
});
