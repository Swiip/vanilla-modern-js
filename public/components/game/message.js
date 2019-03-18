import { store } from "/logic/connector.js";
import { render } from "/vdom/render.js";

import "./message-container.js";

class Message extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.update = this.update.bind(this);
    store.subscribe(this.update);
    this.update();
  }
  update() {
    const { won, lost } = store.getState();

    const template = `
      <swiip-message-container show=${won || lost}>
        <h2>
          <span>${won ? "You Win!" : ""}</span>
          <span>${lost ? "Game Over" : ""}</span>
        </h2>
      </div>
    `;

    render(this.shadowRoot, template);
  }
}

customElements.define("swiip-message", Message);
