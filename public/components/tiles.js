import {
  component,
  withProp,
  withMarkup,
  withHandler,
  withConnected,
  withStore,
  html
} from "/framework/component.js";

import "/components/tile.js";

component(
  "swiip-tiles",
  withStore(({ board }) => {
    const tiles = [];

    if (!board) {
      return tiles;
    }

    board.forEach(rows => {
      rows.forEach(cell => {
        if (cell.value > 0) {
          tiles.push(cell);
        }
        if (Array.isArray(cell.mergedTiles)) {
          tiles.push(...cell.mergedTiles);
        }
      });
    });

    return { tiles };
  }),
  withMarkup(({ tiles = [] }) => html`
    <div>
      ${tiles.map(tile => html`
        <swiip-tile key=${tile.id} tile=${tile}>
          ${tile.value}
        </swiip-tile>
      `)}
    </div>
  `)
);
