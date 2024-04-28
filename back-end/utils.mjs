import { db } from "./db.mjs";
import { apiKey } from "./config.mjs";
import OpenAI from "openai";

export class Utils {
  static #currWord = "";
  static #currContext = [];

  static async newWord() {
    try {
      Utils.#newContext();
      return await Utils.#fetchWord();
    } catch (e) {
      console.error(e);
      return null;
    }
  }

  static async newHint() {
    const openai = new OpenAI({ apiKey: apiKey });

    try {
      if (Utils.#currContext.length === 0) {
        throw new Error(
          "Error (utils.mjs/newHint): Current context array is not initialized"
        );
      }

      let result = await openai.chat.completions.create({
        messages: Utils.#currContext,
        model: "gpt-3.5-turbo",
      });

      let reply = result.choices[0];

      Utils.#addContext(reply);

      return reply;
    } catch (e) {
      console.error(e);
      return null;
    }
  }

  static async updateScore(guess) {
    if (
      guess === undefined ||
      typeof guess !== "number" ||
      !(guess > 0 && guess < 7)
    ) {
      return { valid: false };
    }

    try {
      await db.run(
        "UPDATE scores SET amount = amount + 1 WHERE number = ?",
        guess
      );

      return Utils.getScores();
    } catch (e) {
      console.error(e);
      return { valid: true };
    }
  } // request: "1" or "2" ...

  static async getScores() {
    try {
      let result = await db.all("SELECT count FROM scores ORDER BY number ASC");
      return result.map((c) => c.count);
    } catch (e) {
      console.error(e);
      return null;
    }
  } // returns: {"1": 20, "2": 10 ...}

  // Private Utility Functions
  static async #fetchWord() {
    try {
      let checked = false;
      let randWord;

      while (!checked) {
        let randWordProm = await fetch(
          "https://random-word-api.herokuapp.com/word?length=5"
        );

        if (!randWordProm.ok) {
          throw new Error("Random-Word API Error");
        }

        randWord = await randWordProm.json();

        Utils.#currWord = randWord[0];

        checked = await Utils.#checkWord();

        if (checked === null) {
          throw new Error("Word Checking Failed");
        }
      }

      return Utils.#currWord;
    } catch (e) {
      console.error(e);
      return null;
    }
  }

  static async #checkWord() {
    try {
      let result = await db.get(
        "SELECT word FROM words WHERE word = ?",
        Utils.#currWord
      );
      return result === undefined;
    } catch (e) {
      console.error(e);
      return null;
    }
  }

  static #newContext() {
    Utils.#currContext = [
      {
        role: "system",
        content:
          "You generate hints for a Wordle game. " +
          "You generate a short and unique hint each time based on the word given. " +
          "Each hint will contain information that was not already shown in previous hints.",
      },
      {
        role: "user",
        content: `Generate a short hint for a Wordle game where the solution is '${
          Utils.#currWord
        }' and only return the hint itself. Make sure to not include information already shown in previous hints.`,
      },
    ];
  }

  static #addContext(reply) {
    Utils.#addContext.push({
      role: "assistant",
      content: reply,
    });
  }
}
