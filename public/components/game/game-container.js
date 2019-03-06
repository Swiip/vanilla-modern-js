customElements.define(
  "swiip-game-container",
  class GameContainer extends HTMLElement {
    connectedCallback() {
      this.attachShadow({ mode: "open" });
      this.shadowRoot.innerHTML = `
        <style>
          :host {
            display: block;
            margin-top: 40px;
            position: relative;
            background: var(--light-bg-brown);
            border-radius: 6px;
            width: 500px;
            height: 500px;
            box-sizing: border-box;
          }
        </style>
        <slot></slot>
      `;
    }
  }
);