customElements.define(
  "swiip-container",
  class Container extends HTMLElement {
    connectedCallback() {
      this.attachShadow({ mode: "open" });
      this.shadowRoot.innerHTML = `
        <style>
          :host {
            display: block;
            width: 500px;
            margin: 0 auto;
          }
        </style>
        <slot></slot>
      `;
    }
  }
);
