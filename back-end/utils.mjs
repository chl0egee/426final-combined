import { db } from "./db.mjs";
import { apiKey } from "./config.mjs";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

export class Utils {
  static #currWord = "";
  static #currContext = [
    {
      role: "user",
      parts: [
        {
          text:
            "You generate hints for a Wordle game. " +
            "You generate a short and unique hint each time based on the word given. " +
            "Each hint will contain information that was not already shown in previous hints. " +
            'You will give your responses in this format: "Hint: Generated hint" ' +
            "It is crucial that you do not give the word in your response.",
        },
      ],
    },
    {
      role: "model",
      parts: [
        {
          text: 'Got it, please provide the word and I will respond with the format "Hint: Generated hint".',
        },
      ],
    },
  ];

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
    try {
      let chat = model.startChat({ history: Utils.#currContext });

      let result = await chat.sendMessage(Utils.#currWord);
      let response = await result.response;
      Utils.#addContext(response.text());
      return response.text();
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
        role: "user",
        parts: [
          {
            text:
              "You generate hints for a Wordle game. " +
              "You generate a short and unique hint each time based on the word given. " +
              "Each hint will contain information that was not already shown in previous hints. " +
              'You will give your responses in this format: "Hint: Generated hint" ' +
              "It is crucial that you do not give the word in your response.",
          },
        ],
      },
      {
        role: "model",
        parts: [
          {
            text: 'Got it, please provide the word and I will respond with the format "Hint: Generated hint".',
          },
        ],
      },
    ];
  }

  static #addContext(reply) {
    Utils.#currContext.push(
      {
        role: "user",
        parts: [
          {
            text: Utils.#currWord,
          },
        ],
      },
      {
        role: "model",
        parts: [
          {
            text: reply,
          },
        ],
      }
    );
  }
}
