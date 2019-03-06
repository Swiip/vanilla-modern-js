customElements.define(
  "swiip-restart-button",
  class RestartButton extends HTMLElement {
    connectedCallback() {
      this.attachShadow({ mode: "open" });
      this.shadowRoot.innerHTML = `
        <style>
          :host {
            color: var(--light-text-white);
            background-color: var(--heavy-bg-brown);
            border-radius: 3px;
            padding: 0 20px;
            text-decoration: none;
            color: #f9f6f2;
            height: 40px;
            cursor: pointer;
            display: flex;
            text-align: center;
            justify-content: center;
            align-items: center;
          }
        </style>
        <slot></slot>
      `;
    }
  }
);
