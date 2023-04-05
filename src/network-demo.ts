import { Network } from "pubhop";

type EventHandlers = {
  click: (x: number, y: number) => void;
  load: () => void;
  exit: (time: Date) => void;
};

const network = new Network<EventHandlers>();

const unsub = network.subscribe("click", (x, y) => {
  console.log(`recieved click at coordinates (${x},${y})`);
});

const unfollow = network.follow((event, ...data) => {
  console.log(`${event} event triggered`);
  if (event !== "load") {
    console.log(`with ${data.join(", ")}`);
  }

  if (event === "exit") {
    data;
    unfollow();
  }
});

network.publish("load");
network.publish("click", 10, 200);
network.publish("click", -210, 150);
network.publish("exit", new Date());
network.clear("click");
network.publish("click", 0, 0);
