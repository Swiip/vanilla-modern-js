import { render } from "/framework/render.js";

import { store } from "/logic/connector.js";

const template = `
  <root></root>

  <style>
    .game-message {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      border-radius: 6px;
      z-index: 20;
      background-color: #faf8ef99;
      display: flex;
      justify-content: center;
      align-items: center;
      opacity: 0;
      transition: opacity .3s ease;
    }

    .game-message.show {
      opacity: 1;
    }

    h2 {
      font-size: 50px;
    }
  </style>
`;

customElements.define(
  "swiip-message",
  class Message extends HTMLElement {
    constructor() {
      super();

      this.attachShadow({ mode: "open" });
      this.shadowRoot.innerHTML = template;

      this.root = this.shadowRoot.querySelector("root");
    }

    connectedCallback() {
      store.subscribe(() => this.update());
      this.update();
    }

    update() {
      const { won, lost } = store.getState();

      render(
        this.root,
        `
        <div class="game-message ${won || lost ? "show" : ""}">
          <h2>
            ${won ? "You Win!" : ""}
            ${lost ? "Game Over" : ""}
          </h2>
        </div>
        `
      );
    }
  }
);
