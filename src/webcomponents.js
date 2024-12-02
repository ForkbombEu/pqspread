// @unocss-include
import { zencode_exec } from "zenroom";
import { SS, LS, stringify } from "./utils";

export class Zencode extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  attributeChangedCallback() {
    this.render();
  }

  static get observedAttributes() {
    return ["d", "k", "storage"];
  }

  render() {
    const storage = this.getAttribute("storage") || "session";
    const id = this.getAttribute("id");
    const script = this.textContent.trim();
    const data = stringify(this.getAttribute("d"));
    const keys = stringify(this.getAttribute("k"));
    const params = {};
    if (data !== "null") params.data = data;
    if (keys !== "null") params.keys = keys;
    console.log(params);
    zencode_exec(script, params)
      .then((r) => {
        if (storage === "local") LS(id, r.result);
        if (storage === "session") SS(id, r.result);
        console.log("Stored", id, r.result);
      })
      .catch((e) => {
        console.error("Error of " + id, e.logs);
      });
  }
}

customElements.define("zencode-exec", Zencode);

export class BrutalistCard extends HTMLElement {
  static get observedAttributes() {
    return ["title", "content"];
  }

  attributeChangedCallback() {
    this.render();
  }

  render() {
    const title = this.getAttribute("title") || "";
    const content = this.getAttribute("content") || "";
    const description = this.getAttribute("description") || "";

    const isHttps = window.location.protocol === "https:";

    this.innerHTML = `
      <div class="p-2 border border-black space-y-2">
        <div class="flex flex-col md:flex-row justify-between items-baseline items-start">
          <h2 class="text-lg font-bold uppercase">${title}</h2>
          <p class="text-xs">${description}</p>
          ${
            isHttps
              ? `<button 
                class="text-sm border border-black px-2 py-1 hover:bg-black hover:text-white"
                onClick="navigator.clipboard.writeText('${content.replace(/'/g, "\\'")}').then(() => alert('Copied to clipboard!')).catch(() => alert('Failed to copy!'))"
            >
                Copy
            </button>`
              : ""
          }
        </div>
        <div class="font-mono text-xs overflow-auto border-t border-black pt-2 break-all selection:bg-[#ca9ee6] selection:text-white">
        <p>${content}</p>
        </div>
      </div>
    `;
  }
}

customElements.define("brutalist-card", BrutalistCard);
