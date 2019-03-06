customElements.define(
  "swiip-message-container",
  class MessageContainer extends HTMLElement {
    constructor() {
      super();
      this._show = false;
    }
    set show(show) {
      this._show = show;
      this.update();
    }
    connectedCallback() {
      this.attachShadow({ mode: "open" });

      if (!this.attributes.show) {
        return;
      }

      this.show = this.attributes.show.value;
      this.update();
    }
    update() {
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
            opacity: ${this._show ? 1 : 0};
          }
        </style>
        <slot></slot>
      `;
    }
  }
);
