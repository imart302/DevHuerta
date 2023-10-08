

const x = document.getElementById('temporal-id');

const params = new URL(window.location.href).searchParams;
const productId = params.get('product');
x.textContent = productId;