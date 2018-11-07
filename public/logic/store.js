// im port store from "/logic/store.js";
// Sadly it does not work yet :
// https://stackoverflow.com/questions/44118600/web-workers-how-to-import-modules

// importScripts("/utils/utils.no-module.js");
// importScripts("/game/conf.js");
// importScripts("/game/tile.js");
// importScripts("/game/add.js");
// importScripts("/game/init.js");
// importScripts("/game/move.js");
// importScripts("/game/end.js");
// importScripts("/logic/reducer.js");

// im port { start } from "/logic/actions.js";
// im port reducer from "/logic/reducer.js";

console.log("WebAssembly from worker", WebAssembly);

importScripts("/wasm/index.js");

let state = {
  board: { current_id: 0, grid: [] },
  changed: false,
  won: false,
  lost: false
};

const defaultAction = {
  action_type: "Init",
  direction: null,
  random_value: null,
  random_position: null
};

const main = async () => {
  const instance = await init();
  const reducer = wrap(instance, "reducer");

  self.onmessage = ({ data }) => {
    const action = {
      ...defaultAction,
      ...data
    };

    try {
      console.log("Rust reducer with", state, action);
      state = reducer({ state, action });
    } catch (error) {
      console.error("Something went wrong with WASM logic", error);
    }

    console.log("dispatched", data, state);
    postMessage(state);
  };

  self.postMessage("READY");
};

main();
