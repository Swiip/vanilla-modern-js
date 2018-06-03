import { range } from "/utils/utils.js";

import { render } from "/framework/render.js";

import { store } from "/logic/connector.js";

// im port { size } from "/game/conf.js";
const size = 4;

const template = `
  <root></root>

  <style>
  .tile {
    position: absolute;
    height: 100px;
    width: 100px;
    border-radius: 3px;
    z-index: 10;
    font-weight: bold;
    font-size: 55px;
    display: flex;
    justify-content: center;
    align-items: center;

    transition: all .3s ease;
    animation: .3s appear;
  }

  .merged {
    z-index: 9;
  }

  .tile2 {
    background-color: #eee4da;
  }

  .tile4 {
    background-color: #ede0c8;
  }

  .tile8 {
    color: #f9f6f2;
    background: #f2b179;
  }

  .tile16 {
    color: #f9f6f2;
    background: #f59563;
  }

  .tile32 {
    color: #f9f6f2;
    background: #f67c5f;
  }

  .tile64 {
    color: #f9f6f2;
    background: #f65e3b;
  }

  .tile128 {
    color: #f9f6f2;
    background: #edcf72;
    font-size: 45px;
  }

  .tile256 {
    color: #f9f6f2;
    background: #edcc61;
    font-size: 45px;
  }

  .tile512 {
    color: #f9f6f2;
    background: #edc850;
    font-size: 45px;
  }

  .tile1024 {
    color: #f9f6f2;
    background: #edc53f;
    font-size: 35px;
  }

  .tile2048 {
    color: #f9f6f2;
    background: #edc22e;
    font-size: 35px;
  }

   @keyframes appear {
     from {
       height: 0;
       width: 0;
       opacity: 0;
       margin-top: 50px;
       margin-left: 50px;
     }
     to {
       height: 100px;
       width: 100px;
       opacity: 1;
       margin-top: 0;
       margin-left: 0;
     }
   }
  </style>
`;

customElements.define(
  "swiip-tiles",
  class Tiles extends HTMLElement {
    constructor() {
      super();

      this.attachShadow({ mode: "open" });
      this.shadowRoot.innerHTML = template;

      this.root = this.shadowRoot.querySelector("root");
    }

    connectedCallback() {
      // console.log("tiles", worker);
      store.subscribe(() => this.updateTiles());
      this.updateTiles();
    }

    updateTiles() {
      const { board } = store.getState();

      if (!board) {
        return;
      }

      const tiles = [];

      board.forEach(rows => {
        rows.forEach(cell => {
          if (cell.value > 0) {
            tiles.push(cell);
          }
          if (Array.isArray(cell.mergedTiles)) {
            tiles.push(...cell.mergedTiles);
          }
        });
      });

      const newHtml = `
        <div class="tile-container">
          ${tiles
            .map(
              tile =>
                `<div
                  key="${tile.id}"
                  class="tile tile${tile.value} ${tile.merged ? "merged" : ""}"
                  style="top: ${20 + 120 * tile.row}px; left: ${20 +
                  120 * tile.column}px;">
                  ${tile.value}
                </div>`
            )
            .join("")}
        </div>
      `;

      render(this.root, newHtml);
    }
  }
);
