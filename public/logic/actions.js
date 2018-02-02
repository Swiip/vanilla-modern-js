import { chooseRandomTile } from "/game/add.js";

export const ADD_TILE = "ADD_TILE";
export function addTile(board) {
  const { row, column, value } = chooseRandomTile(board);
  return {
    type: ADD_TILE,
    row,
    column,
    value
  };
}

export const MOVE = "MOVE";
function actionMove(direction) {
  return {
    type: MOVE,
    direction
  };
}

export const UPDATE = "UPDATE";
function update() {
  return {
    type: UPDATE
  };
}

export const START = "START";
function actionStart() {
  return {
    type: START
  };
}

export function move(direction, { dispatch, getState }) {
  dispatch(actionMove(direction));
  const { board, changed } = getState();
  if (changed) {
    dispatch(addTile(board));
  }
  dispatch(update());
  // dispatch(hasWon(board));
  // dispatch(hasLost(board));
}

export function start({ dispatch, getState }) {
  dispatch(actionStart());
  const { board } = getState();
  dispatch(addTile(board));
  dispatch(update());
}
