import { TypedMap } from "pubhop";

type PossibleData = Record<`${number},${number}`, "odd" | "even"> & {
  points: number;
};

const map = new TypedMap<PossibleData>();

for (let i = 0; i < 3; i++) {
  for (let j = 0; j < 3; j++) {
    if ((i + j) % 2 === 0) {
      map.set(`${i},${j}`, "even");
      const points = map.get("points") ?? 0;
      map.set("points", points + 1);
    } else {
      map.set(`${i},${j}`, "odd");
    }
  }
}

map.forEach((value, key) => {
  if (key === "points") return;

  console.log(`${key}: ${value}`);
});

console.log(`There were ${map.get("points")} even results`);
