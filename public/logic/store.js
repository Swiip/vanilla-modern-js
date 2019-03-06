// Sadly it does not work yet :
// https://stackoverflow.com/questions/44118600/web-workers-how-to-import-modules

// im port wrap from "/wasm/index.js";
// im port wrap from "/wasm/wrap.js";

console.log("WebAssembly from worker", WebAssembly);

importScripts("/wasm/index.js");
importScripts("/wasm/wrap.js");

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
