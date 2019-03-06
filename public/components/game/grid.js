import { range } from "/utils/utils.js";
import { html } from "/vdom/parser.js";
import { render } from "/vdom/render.js";

import "./grid-container.js";
import "./grid-cell.js";

const size = 4;

customElements.define(
  "swiip-grid",
  class Grid extends HTMLElement {
    connectedCallback() {
      this.attachShadow({ mode: "open" });

      render(
        this.shadowRoot,
        html`
          <swiip-grid-container>
            ${
              range(size).map(x =>
                range(size).map(
                  y => html`
                    <swiip-grid-cell x="${x}" y="${y}"></swiip-grid-cell>
                  `
                )
              )
            }
          </swiip-grid-container>
        `
      );
    }
  }
);
