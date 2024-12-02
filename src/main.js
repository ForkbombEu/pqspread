import "@fontsource-variable/jetbrains-mono";
import "@unocss/reset/tailwind.css";
import "virtual:uno.css";
import "./style.css";
import Alpine from "alpinejs";
import "./webcomponents.js";
import { download, LG, SC, SG, SS } from "./utils";

window.Download = download;
window.LG = LG;
window.SG = SG;
window.SC = SC;
window.SS = SS;
window.Alpine = Alpine;
Alpine.start();

