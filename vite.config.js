import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import path, { resolve } from "path";
import { fileURLToPath } from "url";
import { defineConfig } from "vite";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: { alias: { "@": path.resolve(__dirname, "src") } },
  build: {
    outDir: "dist",
    cssCodeSplit: true,
    rollupOptions: {
      input: {
        "figgy-dashboard": resolve(__dirname, "src/main.jsx"),
      },
      output: {
        entryFileNames: "figgy-dashboard.js",
        assetFileNames: "figgy-dashboard.css",
      },
    },
  },
});
