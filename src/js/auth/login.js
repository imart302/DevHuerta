import { EMAIL_REGEX } from '../utils/constants.js';
import { login } from '../api/auth.js';
import { LoggedUser } from '../api/dtos/loggedUser.js';


const LOGIN_DOM = {
	loginForm: document.getElementById('id-form-login'),
	formInputs: {
		inputEmail: document.getElementById('id-input-email'),
		inputPassword: document.getElementById('id-input-password'),
	},

	clearFormInputs: function () {
		const loginInputs = this.formInputs;

		Object.keys(loginInputs).forEach((inputKey) => {
			loginInputs[inputKey].value = '';
		});
	},
};

/**
 * Se añade el Sweet Alert, para implementar
 * los POPUP cuando se ingrese a la sesión.
 */
const swalBootstrapBtn = Swal.mixin({
  customClass: {
    confirmButton: 'btn btn-info',
  },
  buttonsStyling: false
})


/*Añadir Eventlisteners a los inputs del form
Los eventos que va a escuchar son "blur" e "input" 
*/

Object.keys(LOGIN_DOM.formInputs).forEach((inputKey) => {
	const input = LOGIN_DOM.formInputs[inputKey];
	//Se agrega lo que debe de hacer cuando se hace un blur en los inputs
	input.addEventListener('blur', () => {
		if (input.value) {
			input.classList.remove('is-invalid');
		} else {
			input.classList.add('is-invalid');
		}
		if (input.attributes.type.nodeValue == 'email' && input.value) {
			if (EMAIL_REGEX.test(input.value)) {
				input.classList.remove('is-invalid');
			} else {
				input.classList.add('is-invalid');
			}
		}
	});

	//Aqui escucha cuando el usuario ingresa algo en los inputs
	input.addEventListener('input', () => {
		if (input.value) {
			input.classList.remove('is-invalid');
		} else {
			input.classList.add('is-invalid');
		}
	});
});

/**
 * Función para validar que los campos de los inputs estén correctos
 */

function validateFields() {
	let badRequest = false;
	Object.keys(LOGIN_DOM.formInputs).forEach((inputKey) => {
		const input = LOGIN_DOM.formInputs[inputKey];
		if (input.value) {
			input.classList.remove('is-invalid');
		} else {
			badRequest = true;
			input.classList.add('is-invalid');
		}
		if (input.attributes.type.nodeValue == 'email' && input.value) {
			if (EMAIL_REGEX.test(input.value)) {
				input.classList.remove('is-invalid');
			} else {
				badRequest = true;
				input.classList.add('is-invalid');
			}
		}
	});
	return !badRequest;
}


function loginUser(userData) {
	login(userData).then((loggedUser) => {
		const userString = JSON.stringify(loggedUser);
		localStorage.setItem("userLogged",userString);
    LOGIN_DOM.clearFormInputs();
    swalBootstrapBtn.fire({
      title: 'Bienvenido',
			text: `${loggedUser.firstName} ${loggedUser.lastName}`,
      icon: 'success',
      confirmButtonText: 'Siguiente'
		}).then(() => {
      // Cuando te has logeado con exito redirecciona a la pagina principal
      window.location.href = "../";
    });
	});
}

/**
 * Aquí vamos a escuchar el evento submit del form del login
 */
LOGIN_DOM.loginForm.addEventListener('submit', (ev) => {
	ev.preventDefault();
	if (validateFields()) {
		const userData = {
			email: LOGIN_DOM.formInputs.inputEmail.value,
			password: LOGIN_DOM.formInputs.inputPassword.value,
		};
		console.log(userData);
		loginUser(userData);
	} else {
		console.log('Campos inválidos');
	}
});
