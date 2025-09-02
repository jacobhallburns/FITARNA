import { defineConfig } from "vite";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

// Recreate __dirname for ESM
const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  root: "Website",         // or "." if vite.config.ts is inside Website/
  base: "/FITARNA/",
  publicDir: "public",     // Website/public → served at /FITARNA/
  server: { open: true },
  build: {
    outDir: "dist",        // Website/dist
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main:    resolve(__dirname, "Website/index.html"),
        about:   resolve(__dirname, "Website/webpages/about_us.html"),
        contact: resolve(__dirname, "Website/webpages/contact.html"),
      },
    },
  },
});
