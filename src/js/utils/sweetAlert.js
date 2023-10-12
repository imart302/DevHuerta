/**
 * Sweet Alert un modal fácil de usar,
 * aquí sobrecarga los estilos de bootstrap
 */
export const swalWithBootstrapButtons = Swal.mixin({
  customClass: {
    confirmButton: 'btn btn-info',
  },
  buttonsStyling: false,
});