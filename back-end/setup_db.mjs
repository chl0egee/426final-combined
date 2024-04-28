import { db } from "./db.mjs";

await db.run(
  "CREATE TABLE scores (number INTEGER PRIMARY KEY, amount INTEGER NOT NULL)"
);

await db.run("CREATE TABLE words (word TEXT NOT NULL)");

await db.run(
  "INSERT INTO scores VALUES (1, 0), (2, 0), (3, 0), (4, 0), (5, 0), (6, 0);"
);

db.close();
