import { render } from "/vdom/render.js";

import "./grid-container.js";
import "./grid-cell.js";

const size = 4;
const range = n => Array.apply(null, Array(n)).map((_, i) => i);
const coords = range(size)
  .map(x => range(size).map(y => [x, y]))
  .flat();

class Grid extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    const template = `
        <swiip-grid-container>
          ${coords
            .map(
              ([x, y]) =>
                `<swiip-grid-cell x="${x}" y="${y}"></swiip-grid-cell>`
            )
            .join("")}
        </swiip-grid-container>
      `;

    render(this.shadowRoot, template);
  }
}

customElements.define("swiip-grid", Grid);
