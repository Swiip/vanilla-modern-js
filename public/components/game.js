import "/components/grid.js";
import "/components/tiles.js";
import "/components/message.js";

import { store } from "/logic/connector.js";
import {
  component,
  withStyle,
  withMarkup,
  withHandler,
  withConnected,
  html,
  css
} from "/framework/component.js";

component(
  "swiip-game-container",
  withStyle(
    () => css`
      :host {
        display: block;
        margin-top: 40px;
        position: relative;
        background: var(--light-bg-brown);
        border-radius: 6px;
        width: 500px;
        height: 500px;
        box-sizing: border-box;
      }
    `
  )
);

component(
  "swiip-game",
  withHandler("keyHandler", () => event => {
    const keyMapping = {
      ArrowLeft: 0,
      ArrowUp: 1,
      ArrowRight: 2,
      ArrowDown: 3
    };
    if (keyMapping[event.key] !== undefined) {
      store.dispatch({
        type: "MOVE",
        direction: keyMapping[event.key],
        randomPosition: Math.random(),
        randomValue: Math.random()
      });
      event.preventDefault();
    }
  }),
  withConnected(({ keyHandler }) => {
    window.addEventListener("keydown", event => keyHandler(event));
  }),
  withMarkup(() => html`
    <swiip-game-container>
      <swiip-grid></swiip-grid>
      <swiip-tiles></swiip-tiles>
      <swiip-message></swiip-message>
    </swiip-game-container>
  `)
);
