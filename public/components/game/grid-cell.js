customElements.define(
  "swiip-grid-cell",
  class GridCell extends HTMLElement {
    connectedCallback() {
      const {
        x: { value: x },
        y: { value: y }
      } = this.attributes;
      this.attachShadow({ mode: "open" });
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
);
