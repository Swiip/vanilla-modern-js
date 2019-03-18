class Container extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          width: 500px;
          margin: 0 auto;
        }
      </style>
      <slot></slot>
    `;
  }
}

customElements.define("swiip-container", Container);
