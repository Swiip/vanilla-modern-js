import { component, withStyle } from "/framework/component.js";

component(
  "swiip-container",
  withStyle(
    () => `
      :host {
        width: 500px;
        margin: 0 auto;
      }
    `
  )
);
