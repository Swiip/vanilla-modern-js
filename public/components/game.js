import "/components/grid.js";
import "/components/tiles.js";
import "/components/message.js";

import { store } from "/logic/connector.js";

const template = `
  <div class="game-container">
    <swiip-grid></swiip-grid>
    <swiip-tiles></swiip-tiles>
    <swiip-message></swiip-message>
  </div>

  <style>
  .game-container {
    margin-top: 40px;
    position: relative;
    background: var(--light-bg-brown);
    border-radius: 6px;
    width: 500px;
    height: 500px;
    box-sizing: border-box;
  }
  </style>
`;

customElements.define(
  "swiip-game",
  class Game extends HTMLElement {
    constructor() {
      super();

      this.attachShadow({ mode: "open" });
      this.shadowRoot.innerHTML = template;
    }

    connectedCallback() {
      this.listenKeyboard();
    }

    listenKeyboard() {
      window.addEventListener("keydown", event => this.keyHandler(event));
    }

    keyHandler(event) {
      const keyMapping = {
        ArrowLeft: 0,
        ArrowUp: 1,
        ArrowRight: 2,
        ArrowDown: 3
      };
      if (keyMapping[event.key] !== undefined) {
        store.dispatch({
          type: "MOVE",
          direction: keyMapping[event.key],
          randomPosition: Math.random(),
          randomValue: Math.random()
        });
        event.preventDefault();
      }
    }
  }
);
