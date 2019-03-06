customElements.define(
  "swiip-above-game-container",
  class AboveGameContainer extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: "open" });
      this.shadowRoot.innerHTML = `
        <style>
          :host {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
          }
        </style>
        <slot></slot>
      `;
    }
  }
);
