import { range } from "/utils/utils.js";

import { render } from "/render/render.js";

// im port { size } from "/game/conf.js";
const size = 4;

const template = `
  <root></root>

  <style>
  .grid-container {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;

    display: grid;
    grid-template-columns: repeat(4, 100px);
    grid-template-rows: repeat(4, 100px);
    grid-gap: 20px 20px;
    justify-content: center;
    align-content: center;
  }

  .grid-cell {
    position: absolute;
    height: 100px;
    width: 100px;
    border-radius: 3px;
    background-color: #cdc1b4;
  }
  </style>
`;

customElements.define(
  "swiip-grid",
  class Grid extends HTMLElement {
    constructor() {
      super();

      this.attachShadow({ mode: "open" });
      this.shadowRoot.innerHTML = template;

      this.root = this.shadowRoot.querySelector("root");
    }

    connectedCallback() {
      const newHtml = `
        <div class="grid-container">
          ${range(size)
            .map(x =>
              range(size)
                .map(
                  y =>
                    `<div
                      class="grid-cell"
                      style="grid-area: ${x + 1} / ${y + 1};">
                    </div>`
                )
                .join("")
            )
            .join("")}
        </div>
      `;

      render(this.root, newHtml);
    }
  }
);
