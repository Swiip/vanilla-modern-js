// import { MOVE, START, ADD_TILE, UPDATE } from "/logic/actions.js";

// import { init } from "/game/init.js";
// import { addTile } from "/game/add.js";
// import { update } from "/game/tile.js";
// import { move } from "/game/move.js";

const reducer = (state, action) => {
  switch (action.type) {
    case START: {
      return {
        board: init(),
        changed: false
      };
    }
    case MOVE: {
      return move(state.board, action.direction);
    }
    case ADD_TILE: {
      return {
        ...state,
        board: addTile(state.board, action.row, action.column, action.value)
      };
    }
    case UPDATE: {
      return {
        ...state,
        board: update(state.board)
      };
    }
    default: {
      return state;
    }
  }
};

// export default reducer;
