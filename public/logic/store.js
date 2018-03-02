// im port store from "/logic/store.js";
// Sadly it does not work yet :
// https://stackoverflow.com/questions/44118600/web-workers-how-to-import-modules

importScripts("/utils/utils.no-module.js");
importScripts("/game/conf.js");
importScripts("/game/tile.js");
importScripts("/game/add.js");
importScripts("/game/init.js");
importScripts("/game/move.js");
importScripts("/logic/reducer.js");

// im port { start } from "/logic/actions.js";
// im port reducer from "/logic/reducer.js";

let state = {};

onmessage = ({ data }) => {
  state = reducer(state, data);
  console.log("dispatched", data, state);
  postMessage(state);
};
