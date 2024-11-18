// @unocss-include

export class BrutalistCard extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  static get observedAttributes() {
    return ["title", "content"];
  }

  attributeChangedCallback() {
    this.render();
  }

  render() {
    const title = this.getAttribute("title") || "Default Title";
    const content = this.getAttribute("content") || "Default Content";

    const isHttps = window.location.protocol === "https:";

    this.innerHTML = `
      <div class="p-2 border border-black space-y-2">
        <div class="flex justify-between items-start">
          <h2 class="text-lg font-bold uppercase">${title}</h2>
          ${
            isHttps
              ? `<button 
                class="text-sm border border-black px-2 py-1 hover:bg-black hover:text-white"
                @click="copyToClipboard"
            >
                Copy
            </button>`
              : ""
          }
        </div>
        <div class="font-mono text-sm overflow-auto max-h-96 border-t border-black pt-2 break-all">
          ${content}
        </div>
      </div>
    `;
  }
}

customElements.define("brutalist-card", BrutalistCard);
