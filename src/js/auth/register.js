import { EMAIL_REGEX } from '../utils/constants.js';

const REGISTER_DOM = {
  registerForm: document.getElementById('id-form-register'),
  formInputs: {
    inputFirstName: document.getElementById('id-input-firstName'),
    inputLastName: document.getElementById('id-input-lastName'),
    inputEmail: document.getElementById('id-input-email'),
    inputConfirmEmail: document.getElementById('id-input-confirmEmail'),
    inputPassword: document.getElementById('id-input-password'),
    inputConfirmPassword: document.getElementById('id-input-confirmPassword'),
  },

  clearFormInputs: function () {
    const registerInputs = this.formInputs;

    Object.keys(registerInputs).forEach((inputKey) => {
      registerInputs[inputKey].value = '';
    });
  },
};

/**
 * Sweet Alert un modal fácil de usar,
 * aquí sobrecarga los estilos de bootstrap
 */
const swalWithBootstrapButtons = Swal.mixin({
  customClass: {
    confirmButton: 'btn btn-info',
  },
  buttonsStyling: false,
});

/**
 * Establece event listeners del form Registrase
 * alerta en el dom de errores
 */
Object.keys(REGISTER_DOM.formInputs).forEach((registerKey) => {
  const input = REGISTER_DOM.formInputs[registerKey];

  input.addEventListener('blur', () => {
    input.value
      ? input.classList.remove('is-invalid')
      : input.classList.add('is-invalid');

    if (input.attributes.type.nodeValue == 'email' && input.value) {
      EMAIL_REGEX.test(input.value)
        ? input.classList.remove('is-invalid')
        : input.classList.add('is-invalid');
    }
  });

  input.addEventListener('input', () => {
    input.value
      ? input.classList.remove('is-invalid')
      : input.classList.add('is-invalid');
  });
});

/**
 * Valida que los campos del form sean validos
 */
function validateFields() {
  let badRequest = false;
  const registerInputs = REGISTER_DOM.formInputs;

  Object.keys(registerInputs).forEach((inputKey) => {
    if (!registerInputs[inputKey].value) {
      badRequest = true;
      registerInputs[inputKey].classList.add('is-invalid');
    }

    if (registerInputs[inputKey].attributes.type.nodeValue == 'email') {
      EMAIL_REGEX.test(registerInputs[inputKey].value)
        ? registerInputs[inputKey].classList.remove('is-invalid')
        : registerInputs[inputKey].classList.add('is-invalid');
    }
  });

  /* Si los email no coinciden manda una alerta */
  if (
    registerInputs.inputEmail.value != registerInputs.inputConfirmEmail.value
  ) {
    badRequest = true;
    swalWithBootstrapButtons.fire({
      title: 'Los email no coinciden',
      icon: 'error',
      confirmButtonText: 'Entendido',
    });

    return !badRequest;
  }

  /* Si los password no coinciden manda una alerta */
  if (
    registerInputs.inputPassword.value !=
    registerInputs.inputConfirmPassword.value
  ) {
    badRequest = true;
    swalWithBootstrapButtons.fire({
      title: 'Las contraseñas no coinciden',
      icon: 'error',
      confirmButtonText: 'Entendido',
    });

    return !badRequest;
  }

  return !badRequest;
}

/**
 * Función para enviar un request a la API
 */
function registerUser(user) {
  console.log(user);
  REGISTER_DOM.clearFormInputs();
}

REGISTER_DOM.registerForm.addEventListener('submit', (ev) => {
  ev.preventDefault();

  if (validateFields()) {
    const registerInputs = REGISTER_DOM.formInputs;

    const userData = {
      firstName: registerInputs.inputFirstName.value,
      lastName: registerInputs.inputLastName.value,
      email: registerInputs.inputEmail.value,
      password: registerInputs.inputPassword.value,
    };

    console.log('EVERYTHING LOOKS GOOD');
    registerUser(userData);
  } else {
    console.log('BAD REQUEST');
  }
});
