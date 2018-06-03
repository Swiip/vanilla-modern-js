import { compose } from "/utils/utils.js";
import { render } from "/framework/render.js";

export const component = (name, ...enhancers) => {
  const customElement = class extends HTMLElement {};
  customElements.define(name, compose(...enhancers)(customElement));
};

export const withMarkup = handler => Base =>
  class extends Base {
    connectedCallback() {
      if (super.connectedCallback) {
        super.connectedCallback();
      }
      this.attachShadow({ mode: "open" });
      render(this.shadowRoot, handler(this));
    }
  };

export const withStyle = (...args) => Base => {
  const tag = args.length === 1 ? "div" : args[0];
  const handler = args.length === 1 ? args[0] : args[1];

  return class extends Base {
    connectedCallback() {
      if (super.connectedCallback) {
        super.connectedCallback();
      }
      const name = this.localName;
      this.attachShadow({ mode: "open" });
      this.shadowRoot.innerHTML = `<${tag} class="${name}"><slot></slot></${tag}>`;
      const css = `.${name} {${handler()}}`;
      const style = document.createElement("style");
      style.appendChild(document.createTextNode(css));
      this.shadowRoot.appendChild(style);
    }
  };
};

export const withHandler = (name, handler) => Base =>
  class extends Base {
    [name](event) {
      handler(this)(event);
    }
  };

export const withConnected = hanlder => Base =>
  class extends Base {
    connectedCallback() {
      if (super.connectedCallback) {
        super.connectedCallback();
      }
      hanlder(this);
    }
  };
