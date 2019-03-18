class Scores extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: flex;
          flex-direction: row;
        }
      </style>
      <slot></slot>
    `;
  }
}

customElements.define("swiip-scores", Scores);
