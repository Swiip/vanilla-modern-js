import { html } from "/vdom/parser.js";
import { render } from "/vdom/render.js";

const tileParams = [
  null,
  {
    color: "inherit",
    background: "#eee4da",
    font: "55px"
  },
  {
    color: "inherit",
    background: "#ede0c8",
    font: "55px"
  },
  {
    color: "#f9f6f2",
    background: "#f2b179",
    font: "55px"
  },
  {
    color: "#f9f6f2",
    background: "#f59563",
    font: "55px"
  },
  {
    color: "#f9f6f2",
    background: "#f67c5f",
    font: "55px"
  },
  {
    color: "#f9f6f2",
    background: "#f65e3b",
    font: "55px"
  },
  {
    color: "#f9f6f2",
    background: "#edcf72",
    font: "45px"
  },
  {
    color: "#f9f6f2",
    background: "#edcc61",
    font: "45px"
  },
  {
    color: "#f9f6f2",
    background: "#edc850",
    font: "45px"
  },
  {
    color: "#f9f6f2",
    background: "#edc53f",
    font: "35px"
  },
  {
    color: "#f9f6f2",
    background: "#edc22e",
    font: "35px"
  }
];

customElements.define(
  "swiip-tile",
  class Tile extends HTMLElement {
    constructor() {
      super();
      this._row = null;
      this._column = null;
      this._value = null;
      this._merged = null;
    }
    set row(row) {
      this._row = row;
      this.update();
    }
    set column(column) {
      this._column = column;
      this.update();
    }
    set value(value) {
      this._value = value;
      this.update();
    }
    set merged(merged) {
      this._merged = merged;
      this.update();
    }
    connectedCallback() {
      this.attachShadow({ mode: "open" });

      if (!this.attributes.value) {
        return;
      }

      this.row = this.attributes.row.value;
      this.column = this.attributes.column.value;
      this.value = this.attributes.value.value;
      this.merged = this.attributes.merged.value;
      this.update();
    }
    update() {
      const value = this._value;

      if (value === null) {
        return;
      }

      const row = this._row;
      const column = this._column;
      const merged = this._merged;
      const { color, background, font } = tileParams[Math.log2(value)];

      this.shadowRoot.innerHTML = `
        <style>
          :host {
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

            transition: all 0.3s ease;
            animation: 0.3s appear;

            top: ${20 + 120 * row}px;
            left: ${20 + 120 * column}px;
            color: ${color};
            background-color: ${background};
            font-size: ${font};
            z-index: ${merged ? 9 : 10};
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
        <slot></slot>
      `;
    }
  }
);
