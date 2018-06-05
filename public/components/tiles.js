import {
  component,
  withProp,
  withMarkup,
  withHandler,
  withConnected,
  withStore
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
  withMarkup(
    ({ tiles = [] }) => `
      <div>
        ${tiles
          .map(
            tile => `
              <swiip-tile
                key="${tile.id}"
                row="${tile.row}"
                col="${tile.column}"
                merged="${tile.merged}"
                value="${tile.value}"
              >
                ${tile.value}
              </swiip-tile>
            `
          )
          .join("")}
      </div>
    `
  )
);
