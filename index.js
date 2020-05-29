const express = require("express");
const path = require("path");
const fs = require("fs");

const PORT = process.env.PORT || 5000;
const app = express();

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/api", (req, res) => {
  if (req.query.number <= 30) {
    fs.readFile(
      path.join(__dirname, "json", `${req.query.topic}.json`),
      "utf8",
      (err, data) => {
        if (!err) {
          let test = JSON.parse(data);
          let list = test["mcqs"];
          const shuffled = list
            .sort(() => 0.5 - Math.random())
            .slice(0, req.query.number);

          res.json({ mcq: shuffled });
        } 
      }
    );
  } else {
    res.status(400).end();
  }
});

app.listen(PORT, () => console.log(`Server running on ${PORT}`));
