import {resolve} from "path"
import {fileURLToPath, URL} from "node:url"
import {defineConfig, externalizeDepsPlugin} from "electron-vite"
import vue from "@vitejs/plugin-vue"
import vuetify from "vite-plugin-vuetify";

export default defineConfig({
  main: {
    plugins: [externalizeDepsPlugin()]
  },
  preload: {
    plugins: [externalizeDepsPlugin()]
  },
  renderer: {
    resolve: {
      extensions: [".js", ".vue", ".json"],
      alias: {
        "@renderer": resolve("src/renderer/src"),
        "@": resolve("./src/renderer/src"),
      }
    },
    plugins: [vue(), vuetify({autoImport: true})]
  },

})
