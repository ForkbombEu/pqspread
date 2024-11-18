import { defineConfig } from "vite";
import UnoCSS from "unocss/vite";
import { viteSingleFile } from "vite-plugin-singlefile";

export default defineConfig({
  plugins: [UnoCSS(), viteSingleFile()],
});
