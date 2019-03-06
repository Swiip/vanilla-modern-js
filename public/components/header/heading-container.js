customElements.define(
  "swiip-heading-container",
  class HeadingContainer extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: "open" });
      this.shadowRoot.innerHTML = `
        <style>
          :host {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
          }
        </style>
        <slot></slot>
      `;
    }
  }
);
