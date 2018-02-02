let tileId = 0;

export function createTile(value, row, column) {
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

export function isNew(tile) {
  return tile.oldRow === -1;
}

export function hasMoved(tile) {
  return (
    tile.oldRow !== -1 &&
    (tile.oldRow !== tile.row || tile.oldColumn !== tile.column)
  );
}

export function update(board) {
  const updateBoth = (tile, row, column, merged) => {
    tile = updatePositions(tile, row, column);
    tile = updateClasses(tile, merged);
    return tile;
  };

  return board.map((row, rowIndex) => {
    return row.map((tile, columnIndex) => {
      tile = updateBoth(tile, rowIndex, columnIndex, false);
      if (tile.merged) {
        tile.merged = tile.merged.map(tile => {
          return updateBoth(tile, rowIndex, columnIndex, true);
        });
      }
      return tile;
    });
  });
}

// export function updateUndo(board, oldBoard) {
//   return board.map(row => {
//     return row.map(tile => {
//       tile = updateUndoClasses(tile, searchTile(oldBoard, tile.id));
//       return tile;
//     });
//   });
// }

function updatePositions(tile, row, column) {
  return {
    ...tile,
    oldRow: tile.row,
    oldColumn: tile.column,
    row,
    column
  };
}

function updateClasses(tile, merged = false) {
  tile = { ...tile };
  tile.classes = ["tile"];
  tile.classes.push(`tile${tile.value}`);
  if (merged) {
    tile.classes.push("merged");
  } else {
    tile.classes.push(`position_${tile.row}_${tile.column}`);
    if (isNew(tile)) {
      tile.classes.push("new");
    }
  }
  if (merged || hasMoved(tile)) {
    tile.classes.push(`row_from_${tile.oldRow}_to_${tile.row}`);
    tile.classes.push(`column_from_${tile.oldColumn}_to_${tile.column}`);
    tile.classes.push("isMoving");
  }
  return tile;
}

function updateUndoClasses(tile, oldTile) {
  tile = { ...tile };
  tile.classes = _(tile.classes)
    .reject(item => item === "new")
    .reject(className => ~className.indexOf("_from_"))
    .value();

  if (oldTile) {
    tile.classes.push(`row_from_${oldTile.row}_to_${tile.row}`);
    tile.classes.push(`column_from_${oldTile.column}_to_${tile.column}`);
  }

  return tile;
}

// function searchTile(board, id) {
//   return _(board)
//     .flatten()
//     .map(tile => (tile.merged ? [tile, ...tile.merged] : tile))
//     .flatten()
//     .find({ id });
// }
