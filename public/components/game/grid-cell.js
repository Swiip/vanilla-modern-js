class GridCell extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    const x = this.getAttribute("x");
    const y = this.getAttribute("y");

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          position: absolute;
          height: 100px;
          width: 100px;
          border-radius: 3px;
          background-color: #cdc1b4;
          grid-area: ${parseInt(x) + 1} / ${parseInt(y) + 1};
        }
      </style>
      <slot></slot>
    `;
  }
}

customElements.define("swiip-grid-cell", GridCell);
