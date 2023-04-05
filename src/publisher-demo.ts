import { Publisher } from "pubhop";

type Person = {
  name: string;
  age: number;
};

const publisher = new Publisher<(person: Person) => void>();

const unsub = publisher.subscribe((person) => {
  console.log(`${person.name} is ${person.age} years old.`);
});

publisher.subscribe((person) => {
  console.log("Recieved data for person with name: ", person.name);
});

publisher.publish({ name: "Evyatar", age: 19 });
publisher.publish({ name: "Joe", age: 27 });

unsub();

publisher.publish({ name: "Angie", age: 32 });

publisher.clear();

publisher.publish({ name: "No-One", age: 0 });
