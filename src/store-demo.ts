import { Store } from "pubhop";

type Person = {
  name: string;
  age: number;
};

// we could could also do:
// const store = new Store<Person>();
const store = new Store<Person>({ age: 19, name: "Evyatar" });

const unsub = store.subscribe((person) => {
  console.log("The store now contains: ");
  console.log(JSON.stringify(person, null, 2));
});

let person = store.get();
console.log("The person's name is: ", person?.name);

store.set({ age: 20, name: "Evyatar" });

person = store.get();
console.log("The person's age is: ", person?.age);

unsub();

store.set({ age: 21, name: "Evyatar" });
