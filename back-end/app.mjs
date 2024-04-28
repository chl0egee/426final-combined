import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { Utils } from "./utils.mjs";

const app = express();

const port = 3000;

app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello, COMP 426!");
});

app.get("/word", async (req, res) => {
  let result = await Utils.newWord();

  if (result === null) {
    res.status(500).send("Error: Failed to generate a new word");
    return;
  }

  res.json({ word: result });
});

app.get("/hint", async (req, res) => {
  let result = await Utils.newHint();

  if (result === null) {
    res.status(500).send("Error: Failed to generate a new hint");
    return;
  }

  res.json({ hint: result });
});

app.get("/score", async (req, res) => {
  let result = await Utils.getScores();

  if (result === null) {
    res.status(500).send("Error: Failed to retrieve scores");
    return;
  }

  res.json({ guesses: result });
});

app.put("/score", async (req, res) => {
  let guess = "guess" in req.body ? req.body.guess : undefined;

  let result = await Utils.updateScore(guess);

  if ("valid" in result) {
    if (result.valid) {
      res.status(500).send("Error: Failed to update or retrieve scores");
    } else {
      res.status(400).send("Error: Invalid request");
    }

    return;
  }

  res.json({ guesses: rseult });
});

app.listen(port, () => {
  console.log(`Running --- http://localhost:${port}`);
});
