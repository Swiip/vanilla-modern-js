import { store } from "/logic/connector.js";
import { render } from "/vdom/render.js";

import "./game-container.js";
import "./grid.js";
import "./tiles.js";
import "./message.js";

class Game extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    window.addEventListener("keydown", this.keyHandler);

    render(
      this.shadowRoot,
      `
        <swiip-game-container>
          <swiip-grid></swiip-grid>
          <swiip-tiles></swiip-tiles>
          <swiip-message></swiip-message>
        </swiip-game-container>
      `
    );
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
        action_type: "Move",
        direction: keyMapping[event.key],
        random_position: Math.random(),
        random_value: Math.random()
      });
      event.preventDefault();
    }
  }
}

customElements.define("swiip-game", Game);
