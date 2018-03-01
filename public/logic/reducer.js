// im port { MOVE, START, ADD_TILE, UPDATE } from "/logic/actions.js";

// import { init } from "/game/init.js";
// import { addTile } from "/game/add.js";
// import { update } from "/game/tile.js";
// import { move } from "/game/move.js";

const reducer = (state, action) => {
  switch (action.type) {
    case "START": {
      let newState = {
        board: init(),
        changed: false
      };
      const { row, column, value } = chooseRandomTile(
        newState.board,
        action.randomPosition,
        action.randomValue
      );
      newState.board = addTile(newState.board, row, column, value);
      newState.board = update(newState.board);
      return newState;
    }
    case "MOVE": {
      let newState = move(state.board, action.direction);
      if (newState.changed) {
        const { row, column, value } = chooseRandomTile(
          newState.board,
          action.randomPosition,
          action.randomValue
        );
        newState.board = addTile(newState.board, row, column, value);
      }
      newState.board = update(newState.board);
      return newState;
    }
    default: {
      return state;
    }
  }
};

// export default reducer;
