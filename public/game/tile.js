let tileId = 0;

/* export */ function createTile(value, row, column) {
  return {
    id: tileId++,
    value: value || 0,
    row: row || -1,
    column: column || -1
  };
}

/* export */ function update(board) {
  return board.map((row, rowIndex) => {
    return row.map((tile, columnIndex) => {
      tile = updatePositions(tile, rowIndex, columnIndex);
      if (tile.mergedTiles) {
        tile.mergedTiles = tile.mergedTiles.map(tile => {
          return updatePositions(tile, rowIndex, columnIndex);
        });
      }
      return tile;
    });
  });
}

function updatePositions(tile, row, column) {
  return {
    ...tile,
    row,
    column
  };
}
