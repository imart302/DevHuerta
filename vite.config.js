import path from 'path';
import { defineConfig } from 'vite';


export default config = defineConfig({
	root: path.resolve(__dirname, "src"),
	//base: '/DevHuerta/',  //<-- Usar cuando se utilice github page
  build: {
		outDir: path.resolve(__dirname, "dist"),
    rollupOptions: {
      input: {
				main: path.resolve(__dirname, "src/index.html"),
				review: path.resolve(__dirname, "src/review.html"),
				contact: path.resolve(__dirname, "src/contact.html"),
				about_us: path.resolve(__dirname, "src/about-us.html"),
				store: path.resolve(__dirname, "src/store.html"),
				register: path.resolve(__dirname, "src/auth/register.html"),
				management: path.resolve(__dirname, "src/admin/management.html"),
				product: path.resolve(__dirname, "src/admin/product.html"),

				
			}
    }
  }
});