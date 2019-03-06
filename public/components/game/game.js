import { store } from "/logic/connector.js";
import { html } from "/vdom/parser.js";
import { render } from "/vdom/render.js";

import "./game-container.js";
import "./grid.js";
import "./tiles.js";
import "./message.js";

customElements.define(
  "swiip-game",
  class Game extends HTMLElement {
    connectedCallback() {
      this.attachShadow({ mode: "open" });
      window.addEventListener("keydown", this.keyHandler);
      render(
        this.shadowRoot,
        html`
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
);
