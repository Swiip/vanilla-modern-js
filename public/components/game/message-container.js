class MessageContainer extends HTMLElement {
  static get observedAttributes() {
    return ["show"];
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
    const show = this.getAttribute("show") === "true";

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          position: absolute;
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;
          border-radius: 6px;
          z-index: 20;
          background-color: #faf8ef99;
          display: flex;
          justify-content: center;
          align-items: center;
          transition: opacity 0.3s ease;
          opacity: ${show ? 1 : 0};
        }
      </style>
      <slot></slot>
    `;
  }
}

customElements.define("swiip-message-container", MessageContainer);
