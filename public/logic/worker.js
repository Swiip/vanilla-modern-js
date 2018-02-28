// import store from "/logic/store.js";
// Sadly it does not work yet :
// https://stackoverflow.com/questions/44118600/web-workers-how-to-import-modules

importScripts("/utils/utils.no-module.js");
importScripts("/game/conf.js");
importScripts("/game/tile.js");
importScripts("/game/add.js");
importScripts("/game/init.js");
importScripts("/game/move.js");
importScripts("/logic/reducer.js");
importScripts("/logic/actions.js");
importScripts("/logic/store.js");

onmessage = ({ data: { type, payload } }) => {
  self[type](payload, store);
};

store.subscribe(() => {
  postMessage(store.getState());
});

metaActionStart(store);
