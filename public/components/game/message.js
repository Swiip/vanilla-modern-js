import { store } from "/logic/connector.js";
import { html } from "/vdom/parser.js";
import { render } from "/vdom/render.js";

import "./message-container.js";

customElements.define(
  "swiip-message",
  class Message extends HTMLElement {
    connectedCallback() {
      this.attachShadow({ mode: "open" });
      this.update = this.update.bind(this);
      store.subscribe(this.update);
      this.update();
    }
    update() {
      const { won, lost } = store.getState();

      render(
        this.shadowRoot,
        html`
          <swiip-message-container show=${won || lost}>
            <h2>
              <span>${won ? "You Win!" : ""}</span>
              <span>${lost ? "Game Over" : ""}</span>
            </h2>
          </div>
        `
      );
    }
  }
);
