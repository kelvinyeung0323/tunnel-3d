import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { viteMockServe } from "vite-plugin-mock";
import path from "path";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), viteMockServe({ mockPath: "./src/mock", enable: true })],
  assetsInclude: ["**/*.glb", "**/*.gltf"],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  css: {
    preprocessorOptions: {
      less: {},
    },
  },
});
