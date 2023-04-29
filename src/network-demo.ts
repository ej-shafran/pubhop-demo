import { Network } from "pubhop";

type EventHandlers = {
  click: (x: number, y: number) => void;
  load: () => void;
  exit: (time: Date) => void;
};

const network = new Network<EventHandlers>();

const unfollow = network.follow((event, xOrTime?, y?) => {
  console.log(`${event} event triggered`);

  switch (event) {
    case "load":
      console.log("no data received");
      break;
    case "exit":
      console.log("data: ", xOrTime.toLocaleTimeString());
      unfollow();
      break;
    case "click":
      console.log("data: ", `(${xOrTime},${y})`);
      break;
  }
});

network.subscribe("click", (x, y) => {
  console.log(`received click at coordinates (${x},${y})`);
});

network.publish("load");
network.publish("click", 10, 200);
network.publish("click", -210, 150);
network.publish("exit", new Date());
network.clear("click");
network.publish("click", 0, 0);
