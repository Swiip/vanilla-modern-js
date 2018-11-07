import "/components/container.js";
import "/components/heading.js";
import "/components/above-game.js";
import "/components/game.js";

// import { store } from "/logic/connector.js";

import { init } from "/logic/connector.js";
// import { store } from "/compo/src/store.js";

const main = async () => {
  const store = await init();

  store.dispatch({
    action_type: "Init",
    random_position: Math.random(),
    random_value: Math.random()
  });
};

main();

// navigator.serviceWorker
//   .register("/sw.js")
//   .then(() => console.log("CLIENT: service worker registration complete."))
//   .catch(() => console.log("CLIENT: service worker registration failure."));
