// Sadly { type: "module" } does not work yet :
// https://stackoverflow.com/questions/44118600/web-workers-how-to-import-modules
const worker = new Worker("/logic/store.js", { type: "module" });

const storeConnector = worker => {
  let state = {};
  const subscribers = [];
  const getState = () => state;
  const subscribe = listener => subscribers.push(listener);
  worker.onmessage = message => {
    state = message.data;
    subscribers.forEach(subscriber => subscriber());
  };
  const dispatch = action => worker.postMessage(action);
  return { getState, subscribe, dispatch };
};

export const store = storeConnector(worker);
