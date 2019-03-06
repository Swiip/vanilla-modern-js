// Sadly { type: "module" } does not work yet :
// https://stackoverflow.com/questions/44118600/web-workers-how-to-import-modules
// const worker = new Worker("/logic/store.js", { type: "module" });
// New Chrome 67 works!
// Firefox still not :(

export const store = {};

export const init = () =>
  new Promise(resolve => {
    const worker = new Worker("/logic/store.js");

    worker.onmessage = message => {
      console.log("init message", message);
      if (message.data === "READY") {
        start(worker);
        resolve(store);
      }
    };
  });

let state = {};
const subscribers = [];
store.getState = () => state;
store.subscribe = listener => subscribers.push(listener);

const start = worker => {
  worker.onmessage = message => {
    state = message.data;
    subscribers.forEach(subscriber => subscriber());
  };
  store.dispatch = action => worker.postMessage(action);
};
