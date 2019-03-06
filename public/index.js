import "/components/container.js";
import "/components/header/heading.js";
import "/components/header/above-game.js";
import "/components/game/game.js";

import { init } from "/logic/connector.js";

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
