class GridContainer extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    this.shadowRoot.innerHTML = `
      <style>
        :host {
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
      </style>
      <slot></slot>
    `;
  }
}

customElements.define("swiip-grid-container", GridContainer);
