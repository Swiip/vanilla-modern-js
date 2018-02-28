// import { chooseRandomTile } from "/game/add.js";

/* export */ const ADD_TILE = "ADD_TILE";
/* export */ function actionAddTile(board) {
  const { row, column, value } = chooseRandomTile(board);
  return {
    type: ADD_TILE,
    row,
    column,
    value
  };
}

/* export */ const MOVE = "MOVE";
function actionMove(direction) {
  return {
    type: MOVE,
    direction
  };
}

/* export */ const UPDATE = "UPDATE";
function actionUpdate() {
  return {
    type: UPDATE
  };
}

/* export */ const START = "START";
function actionStart() {
  return {
    type: START
  };
}

/* export */ function metaActionMove(direction, { dispatch, getState }) {
  dispatch(actionMove(direction));
  const { board, changed } = getState();
  if (changed) {
    dispatch(actionAddTile(board));
  }
  dispatch(actionUpdate());
  // dispatch(hasWon(board));
  // dispatch(hasLost(board));
}

/* export */ function metaActionStart({ dispatch, getState }) {
  dispatch(actionStart());
  const { board } = getState();
  dispatch(actionAddTile(board));
  dispatch(actionUpdate());
}
