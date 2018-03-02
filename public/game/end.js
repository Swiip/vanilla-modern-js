// im port { size, end } from "./conf";

const deltaX = [-1, 0, 1, 0];
const deltaY = [0, -1, 0, 1];

export function hasWon(board) {
  return (
    _.flatten(board.map(row => row.filter(column => column.value >= end)))
      .length > 0
  );
}

export function hasLost(board) {
  let canMove = false;
  _.range(size).forEach(row => {
    _.range(size).forEach(column => {
      canMove |= board[row][column].value === 0;
      _.range(4).forEach(direction => {
        const newRow = row + deltaX[direction];
        const newColumn = column + deltaY[direction];
        if (
          newRow >= 0 &&
          newRow < size &&
          newColumn >= 0 &&
          newColumn < size
        ) {
          canMove |=
            board[row][column].value === board[newRow][newColumn].value;
        }
      });
    });
  });
  return !canMove;
}
