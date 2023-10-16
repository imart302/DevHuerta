/**Obtenemos los elementos html donde mostraremos los datos */
const firstName = document.getElementById('firstName');
const lastName = document.getElementById('lastName');
const email = document.getElementById('email');

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
    const user = JSON.parse(localStorage.getItem('userLogged'));
    return user;
  } catch (err) {
    console.error(err);
  }
}

/**Función para agregar los datos del usuario a los elementos html correspondientes */
async function showData(user) {
  firstName.textContent = await user.firstName;
  lastName.textContent = await user.lastName;
  email.textContent = await user.email;
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
          window.location.href = '../auth/login.html?fromAccount=true';
        });
    });
});
