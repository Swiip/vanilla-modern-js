import { component, withStyle, css } from "/framework/component.js";

component(
  "swiip-container",
  withStyle(
    () => css`
      :host {
        width: 500px;
        margin: 0 auto;
      }
    `
  )
);
