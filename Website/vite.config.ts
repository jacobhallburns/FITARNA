import { defineConfig } from "vite";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

// ESM-safe __dirname
const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  // This file lives in Website/, so the project root is the current folder
  root: ".",
  base: "/FITARNA/",
  publicDir: "public",      // Website/public → /FITARNA/
  server: { open: true },
  build: {
    outDir: "dist",         // Website/dist
    emptyOutDir: true,
    rollupOptions: {
      input: {
        
        main:    resolve(__dirname, "index.html"),
        mission:   resolve(__dirname, "webpages/mission.html"),
        about_us: resolve(__dirname, "webpages/about_us.html"),
        documetation: resolve(__dirname, "webpages/documentation.html")
      },
    },
  },
});
