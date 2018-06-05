import { compose } from "/utils/utils.js";
import { render } from "/framework/render.js";
import { store } from "/logic/connector.js";

export const component = (name, ...enhancers) => {
  const customElement = class extends HTMLElement {
    connectedCallback() {}
    attributeChangedCallback() {}
    update() {}
  };
  customElements.define(name, compose(...enhancers)(customElement));
};

export const withProp = name => Base =>
  class extends Base {
    static get observedAttributes() {
      return [...(super.observedAttributes || []), name];
    }
    attributeChangedCallback(attributeName, oldValue, newValue) {
      super.attributeChangedCallback(attributeName, oldValue, newValue);
      if (attributeName === name) {
        this[name] = newValue;
        this.update();
      }
    }
  };

export const withMarkup = handler => Base =>
  class extends Base {
    connectedCallback() {
      super.connectedCallback();
      this.attachShadow({ mode: "open" });
      render(this.shadowRoot, handler(this));
    }
    update() {
      super.update();
      render(this.shadowRoot, handler(this));
    }
  };

export const withStyle = handler => Base => {
  let styleNode;

  const createStyle = component => {
    const node = document.createElement("style");
    node.appendChild(
      document.createTextNode(`
        :host { display: block }
        ${handler(component)}
      `)
    );
    return node;
  };

  return class extends Base {
    connectedCallback() {
      super.connectedCallback();
      this.attachShadow({ mode: "open" });
      this.shadowRoot.innerHTML = "<slot></slot>";
      styleNode = createStyle(this);
      this.shadowRoot.appendChild(styleNode);
    }
    update() {
      if (styleNode && this.shadowRoot) {
        const oldNode = styleNode;
        styleNode = createStyle(this);
        if (styleNode.isConnected) {
          this.shadowRoot.replaceChild(styleNode, oldNode);
        } else {
          this.shadowRoot.appendChild(styleNode);
        }
      }
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
      super.connectedCallback();
      hanlder(this);
    }
  };

export const withStore = handler => Base =>
  class extends Base {
    connectedCallback() {
      super.connectedCallback();
      const storeUpdateHandler = () => {
        Object.assign(this, handler(store.getState(), this));
        this.update();
      };
      store.subscribe(storeUpdateHandler);
      storeUpdateHandler();
    }
  };
