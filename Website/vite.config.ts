import { defineConfig } from "vite";

export default defineConfig({
  root: ".",             // This only works if vite.config.ts is @ Website! 
  publicDir: "public",   // Anything in Website/public/ is served at /
  server: { open: true },
  build: {
    outDir: "dist",      // Output goes to Website/dist
    emptyOutDir: true
  }
});