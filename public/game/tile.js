let tileId = 0;

/* export */ function createTile(value, row, column) {
  return {
    id: tileId++,
    value: value || 0,
    row: row || -1,
    column: column || -1,
    oldRow: -1,
    oldColumn: -1,
    classes: []
  };
}

/* export */ function isNew(tile) {
  return tile.oldRow === -1;
}

/* export */ function hasMoved(tile) {
  return (
    tile.oldRow !== -1 &&
    (tile.oldRow !== tile.row || tile.oldColumn !== tile.column)
  );
}

/* export */ function update(board) {
  const updateBoth = (tile, row, column, merged) => {
    tile = updatePositions(tile, row, column);
    // tile = updateClasses(tile, merged);
    return tile;
  };

  return board.map((row, rowIndex) => {
    return row.map((tile, columnIndex) => {
      tile = updateBoth(tile, rowIndex, columnIndex, false);
      if (tile.mergedTiles) {
        tile.mergedTiles = tile.mergedTiles.map(tile => {
          return updateBoth(tile, rowIndex, columnIndex, true);
        });
      }
      return tile;
    });
  });
}

function updatePositions(tile, row, column) {
  return {
    ...tile,
    oldRow: tile.row,
    oldColumn: tile.column,
    row,
    column
  };
}
