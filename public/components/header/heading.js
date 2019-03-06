import { render } from "/vdom/render.js";

import "./heading-container.js";
import "./heading-title.js";
import "./scores.js";
import "./score.js";

customElements.define(
  "swiip-heading",
  class Heading extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: "open" });

      render(
        this.shadowRoot,
        `
          <swiip-heading-container>
            <swiip-heading-title>2048</swiip-heading-title>
            <swiip-scores>
              <swiip-score label="${"SCORE"}">123</swiip-score>
              <swiip-score label="${"BEST"}">456</swiip-score>
            </swiip-scores>
          </swiip-heading-container>
        `
      );
    }
  }
);
