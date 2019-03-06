customElements.define(
  "swiip-heading-title",
  class HeadingTitle extends HTMLElement {
    connectedCallback() {
      this.attachShadow({ mode: "open" });
      this.shadowRoot.innerHTML = `
        <style>
          :host {
            font-size: 80px;
            font-weight: bold;
            margin: 0;
          }
        </style>
        <slot></slot>
      `;
    }
  }
);
