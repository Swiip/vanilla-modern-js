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

class Tile extends HTMLElement {
  static get observedAttributes() {
    return ["row", "column", "value", "merged"];
  }
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.update();
  }
  attributeChangedCallback(name, oldValue, newValue) {
    this.update();
  }
  update() {
    const value = parseInt(this.getAttribute("value"));
    const row = parseInt(this.getAttribute("row"));
    const column = parseInt(this.getAttribute("column"));
    const merged = this.getAttribute("merged") === "true";
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

customElements.define("swiip-tile", Tile);
