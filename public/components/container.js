const template = `
  <div class="container">
    <slot></slot>
  </div>

  <style>
  .container {
    width: 500px;
    margin: 0 auto;
  }
  </style>
`;

customElements.define(
  "swiip-container",
  class Container extends HTMLElement {
    constructor() {
      super();

      this.attachShadow({ mode: "open" });
      this.shadowRoot.innerHTML = template;
    }
  }
);
