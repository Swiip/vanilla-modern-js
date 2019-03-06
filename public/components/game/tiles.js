import { store } from "/logic/connector.js";
import { html } from "/vdom/parser.js";
import { render } from "/vdom/render.js";

import "./tile.js";

customElements.define(
  "swiip-tiles",
  class Tiles extends HTMLElement {
    connectedCallback() {
      this.attachShadow({ mode: "open" });
      this.update = this.update.bind(this);
      store.subscribe(this.update);
      this.update();
    }
    update() {
      const { board } = store.getState();
      const tiles = [];

      if (!board) {
        return tiles;
      }

      board.grid.forEach(rows => {
        rows.forEach(cell => {
          if (cell.value > 0) {
            tiles.push(cell);
          }
          if (Array.isArray(cell.merged_tiles)) {
            tiles.push(...cell.merged_tiles);
          }
        });
      });

      render(
        this.shadowRoot,
        html`
          <div>
            ${
              tiles.map(
                tile => html`
                  <swiip-tile
                    key="${tile.id}"
                    row="${tile.row}"
                    column="${tile.column}"
                    value="${tile.value}"
                    merged="${tile.merged}"
                  >
                    ${tile.value}
                  </swiip-tile>
                `
              )
            }
          </div>
        `
      );
    }
  }
);
