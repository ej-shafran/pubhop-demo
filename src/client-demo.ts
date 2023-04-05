import { Client } from "pubhop";

type Person = {
  name: string;
  age: number;
};

type BlogInfo = {
  readers: Person[];
  latestReader: Person;
  likes: number;
};

// we can also do:
// const client = new Client<BlogInfo>();
// or pass the whole thing
const client = new Client<BlogInfo>({ readers: [], likes: 0 });

let likes = client.get("likes");
console.log("likes: ", likes);

client.subscribe("likes", (count) => {
  likes = count;
});

client.subscribe("latestReader", (reader) => {
  console.log(`${reader.name} read the blog`);
  client.set("readers", [...client.get("readers"), reader]);
});

client.subscribe("readers", (readers) => {
  console.log(`${readers.length} people have now read the blog`);
});

client.follow((key, value) => {
  if (key === "likes") {
    console.log(`the blog now has ${value} likes`);
  } else {
    console.log(`the blog has had its ${key} updated`);
  }
});

client.set("latestReader", {
  age: 19,
  name: "Evyatar",
});

for (let i = 0; i < 3; i++) {
  client.set("likes", likes + 1);
}
