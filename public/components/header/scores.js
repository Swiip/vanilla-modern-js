customElements.define(
  "swiip-scores",
  class Scores extends HTMLElement {
    connectedCallback() {
      this.attachShadow({ mode: "open" });
      this.shadowRoot.innerHTML = `
        <style>
          :host {
            display: flex;
            flex-direction: row;
          }
        </style>
        <slot></slot>
      `;
    }
  }
);
