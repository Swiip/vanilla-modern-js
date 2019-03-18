class HeadingTitle extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          font-size: 80px;
          font-weight: bold;
          margin: 0;
        }
      </style>
      <slot></slot>
    `;
  }
}

customElements.define("swiip-heading-title", HeadingTitle);
