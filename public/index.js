import { who } from "./hello.js";

console.log("Hello", who, "!!");

import { store } from "/logic/connector.js";

store.dispatch({
  type: "START",
  randomPosition: Math.random(),
  randomValue: Math.random()
});
