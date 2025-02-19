// SPDX-FileCopyrightText: 2024 The Forkbomb Company
//
// SPDX-License-Identifier: AGPL-3.0-or-later

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
    if (!script) return;
    const data = stringify(this.getAttribute("d"));
    const keys = stringify(this.getAttribute("k"));
    const params = {};
    if (data !== "null") params.data = data;
    if (keys !== "null") params.keys = keys;
    zencode_exec(script, params)
      .then((r) => {
        if (storage === "local") LS(id, r.result);
        if (storage === "session") SS(id, r.result);
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

export class ZencodeWrapper extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    this.container = document.createElement("div");

    this.input = document.createElement("input");
    this.input.type = "file";
    this.input.addEventListener("change", (event) => this.handleFileUpload(event));

    this.zencodeElement = document.createElement("zencode-exec");
    this.script = this.textContent.trim();

    this.container.appendChild(this.input);
    this.container.appendChild(this.zencodeElement);
    this.shadowRoot.appendChild(this.container);

    this.pendingAttributes = {};
  }

  static get observedAttributes() {
    return ["k", "storage", "id"];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    this.zencodeElement.setAttribute(name, newValue);
  }

  handleFileUpload(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    const oldKeyring = JSON.stringify(LG("keyring"));
    reader.onload = (e) => {
      try {
        const uploadedKey = JSON.parse(e.target.result);
        if (!uploadedKey.keyring || !uploadedKey.keyring.mlkem512) {
          throw new Error('Keyring must be of the form {"keyring":{"mlkem512":"..."}}');
        }
        localStorage.removeItem("keyring");
        this.zencodeElement.setAttribute("d", JSON.stringify(uploadedKey));
        this.zencodeElement.textContent = this.script;
        this.zencodeElement.render();
      } catch (error) {
        localStorage.setItem("keyring", oldKeyring);
        console.error("Invalid keyring:", error);
      }
    };
    reader.readAsText(file);
  }
}

customElements.define("zencode-wrapper", ZencodeWrapper);