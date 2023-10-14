import path from 'path';
import { defineConfig } from 'vite';


export default config = defineConfig({
  // root es la raiz de nuestro proyecto es src
	root: path.resolve(__dirname, "src"),
	//base: '/DevHuerta/',  //<-- Usar cuando se utilice github page
  build: {
    // el build del proyecto estará en la carpeta dist
		outDir: path.resolve(__dirname, "dist"),
    rollupOptions: {
      // las paginas html de cada cosa son nuestros puntos de entrada
      input: {
				main: path.resolve(__dirname, "src/index.html"),
				review: path.resolve(__dirname, "src/review.html"),
				contact: path.resolve(__dirname, "src/contact.html"),
				about_us: path.resolve(__dirname, "src/about-us.html"),
				store: path.resolve(__dirname, "src/store.html"),
				register: path.resolve(__dirname, "src/auth/register.html"),
        login: path.resolve(__dirname, "src/auth/login.html"),
				management: path.resolve(__dirname, "src/admin/management.html"),
				product: path.resolve(__dirname, "src/admin/product.html"),
				cart: path.resolve(__dirname, "src/admin/cart.html"),
			}
    }
  }
});