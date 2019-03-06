import { render } from "/vdom/render.js";

import "./above-game-container.js";
import "./restart-button.js";

const newGame = () => {
  console.log("New Game!");
};

customElements.define(
  "swiip-above-game",
  class AboveGame extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: "open" });
      render(
        this.shadowRoot,
        `
          <swiip-above-game-container>
            <p>Join the numbers and get to the <strong>2048 tile!</strong></p>
            <swiip-restart-button onclick="${newGame}">
              New Game
            </swiip-restart-button>
          </swiip-above-game-container>
        `
      );
    }
  }
);
