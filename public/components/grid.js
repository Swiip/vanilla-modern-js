import { range } from "/utils/utils.js";
import { render } from "/framework/render.js";
import {
  component,
  withStyle,
  withMarkup,
  withProp
} from "/framework/component.js";

// im port { size } from "/game/conf.js";
const size = 4;

component(
  "swiip-grid-container",
  withStyle(
    () => `
      :host {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;

        display: grid;
        grid-template-columns: repeat(4, 100px);
        grid-template-rows: repeat(4, 100px);
        grid-gap: 20px 20px;
        justify-content: center;
        align-content: center;
      }
    `
  )
);

component(
  "swiip-grid-cell",
  withProp("x"),
  withProp("y"),
  withStyle(
    ({ x, y }) => `
      :host {
        position: absolute;
        height: 100px;
        width: 100px;
        border-radius: 3px;
        background-color: #cdc1b4;
        grid-area: ${parseInt(x, 10) + 1} / ${parseInt(y, 10) + 1};
      }
    `
  )
);

component(
  "swiip-grid",
  withMarkup(
    () => `
      <swiip-grid-container>
        ${range(size)
          .map(x =>
            range(size)
              .map(
                y =>
                  `
                    <swiip-grid-cell x="${x}" y="${y}">
                    </swiip-grid-cell>
                  `
              )
              .join("")
          )
          .join("")}
      </swiip-grid-container>
    `
  )
);
