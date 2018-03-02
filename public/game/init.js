// im port { range } from "/utils/utils.js";

// im port { size } from "/game/conf.js";
// im port { createTile } from "/game/tile.js";

/* export */ function init() {
  const dimension = range(size);
  return dimension.map(() => dimension.map(() => createTile()));
}
