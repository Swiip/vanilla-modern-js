class GameContainer extends HTMLElement {
  constructor() {
    super();
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

customElements.define("swiip-game-container", GameContainer);
