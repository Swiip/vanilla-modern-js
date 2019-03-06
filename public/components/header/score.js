customElements.define(
  "swiip-score",
  class Score extends HTMLElement {
    connectedCallback() {
      const {
        label: { value: label }
      } = this.attributes;
      this.attachShadow({ mode: "open" });
      this.shadowRoot.innerHTML = `
        <style>
        :host {
          background-color: var(--light-bg-brown);
          color: white;
          padding: 20px 25px 10px 25px;
          font-size: 25px;
          font-weight: bold;
          height: 25px;
          margin: 3px;
          border-radius: 3px;
          text-align: center;
          position: relative;
        }

        :host:after {
          color: var(--disable-text-white);
          display: block;
          position: absolute;
          width: 100%;
          top: 6px;
          left: 0;
          font-size: 13px;
          content: "${label}";
        }
        </style>
        <slot></slot>
      `;
    }
  }
);
