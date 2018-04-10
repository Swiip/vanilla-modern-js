import "/components/container.js";
import "/components/heading.js";
import "/components/above-game.js";
import "/components/game.js";

import { store } from "/logic/connector.js";

store.dispatch({
  type: "START",
  randomPosition: Math.random(),
  randomValue: Math.random()
});

navigator.serviceWorker
  .register("/sw.js")
  .then(() => console.log("CLIENT: service worker registration complete."))
  .catch(() => console.log("CLIENT: service worker registration failure."));
