import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

function manualChunks(id) {
  if (!id.includes("node_modules")) return undefined;
  if (id.includes("react-router-dom")) return "router";
  if (id.includes("lucide-react")) return "icons";
  if (id.includes("react-dom") || id.includes("/react/")) return "react";
  return undefined;
}

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 5173,
    proxy: {
      "/api": "http://localhost:5000",
    },
  },
  build: {
    sourcemap: false,
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        manualChunks,
      },
    },
  },
});
