import "./style.css";
import "@fontsource-variable/jetbrains-mono";
import "@unocss/reset/tailwind.css";
import "virtual:uno.css";
import Alpine from "alpinejs";
//import persist from "@alpinejs/persist";
import "./webcomponents.js";

import { highlight } from "./utils";
import { key_generation } from "./qp-cryptography";

window.highlight = highlight;
window.keygen = key_generation;

window.Alpine = Alpine;
//Alpine.plugin(persist);
//Alpine.data("brutalistCard", (title, content) => ({
//  title,
//  content,
//  copyToClipboard() {
//    navigator.clipboard.writeText(this.content);
//  },
//}));
Alpine.start();
