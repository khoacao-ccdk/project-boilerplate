import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: "0.0.0.0",
    port: 3000,
    hmr: {
      clientPort: parseInt(process.env.WEBSOCKET_PORT!),
    },
  },
  plugins: [react()],
  optimizeDeps: {
    include: ["react-pdf", "pdfjs-dist"],
  },
  build: {
    commonjsOptions: {
      include: [/react-pdf/, /pdfjs-dist/],
    },
  },
  resolve: {
    alias: {
      "pdfjs-dist": resolve(__dirname, "node_modules/pdfjs-dist/build/pdf"),
    },
  },
});
