import { range } from "/utils/utils.js";

import { size } from "/game/conf.js";
import { createTile } from "/game/tile.js";

export function init() {
  const dimension = range(size);
  return dimension.map(() => dimension.map(() => createTile()));
}
