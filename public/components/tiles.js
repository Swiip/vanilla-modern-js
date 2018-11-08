import {
  component,
  withProp,
  withMarkup,
  withHandler,
  withConnected,
  withStore,
  html
} from "/compo/index.js";

import "/components/tile.js";

component(
  "swiip-tiles",
  withStore(({ getState }) => {
    const { board } = getState();
    const tiles = [];

    if (!board) {
      return tiles;
    }

    board.grid.forEach(rows => {
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
  withMarkup(
    ({ tiles = [] }) => html`
    <div>
      ${tiles.map(
        tile => html`
        <swiip-tile key=${tile.id} tile=${tile}>
          ${tile.value}
        </swiip-tile>
      `
      )}
    </div>
  `
  )
);
