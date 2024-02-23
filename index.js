const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const { translate } = require("free-translate");
const cors = require("cors");

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());

app.post("/translate", async (req, res) => {
  try {
    const { text } = req.body;
    const translatedText = await translate(text, {
      from: "en",
      to: "fr",
    });

    return res.status(200).send({ translate: translatedText });
  } catch (error) {
    console.error("Error during translation:", error);
    res.status(500).json({ error: "Failed to translate text" });
  }
});

app.listen(8000, () => {
  console.log("Server running on port 8000");
});
