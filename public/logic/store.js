// im port { start } from "/logic/actions.js";
// import reducer from "/logic/reducer.js";

const createStore = reducer => {
  let state = {};
  const subscribers = [];
  const getState = () => state;
  const subscribe = listener => subscribers.push(listener);
  const dispatch = action => {
    state = reducer(state, action);
    console.log("dispatched", action, state);
    subscribers.forEach(subscriber => subscriber());
  };
  return { getState, subscribe, dispatch };
};

const store = createStore(reducer);

// start(store);

// export default store;
