import { render } from "/vdom/render.js";

import "./above-game-container.js";
import "./restart-button.js";

class AboveGame extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    render(
      this.shadowRoot,
      `
        <swiip-above-game-container>
          <p>Join the numbers and get to the <strong>2048 tile!</strong></p>
          <swiip-restart-button>
            New Game
          </swiip-restart-button>
        </swiip-above-game-container>
      `
    );
  }
}

customElements.define("swiip-above-game", AboveGame);
