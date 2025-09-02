import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  // Config file is inside Website/, so root is current folder
  root: ".",
  base: "/FITARNA/",       // important for GitHub Pages project site
  publicDir: "public",     // Website/public → served at /FITARNA/
  server: { open: true },
  build: {
    outDir: "dist",        // Website/dist
    emptyOutDir: true,
    rollupOptions: {
      input: {
        // add every HTML page you want Vite to process
        main:    resolve(__dirname, "index.html"),
        about:   resolve(__dirname, "webpages/about_us.html"),
        contact: resolve(__dirname, "webpages/contact.html"),
      },
    },
  },
});
