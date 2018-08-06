const SERVER_PORT = process.env.PORT || 4000; // setup the server port number
const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());

app.get("/", (req, res) => res.send("Hello World!"));

app.get("/api/status", (req, res) => res.send({ status: "OK" }));

app.listen(SERVER_PORT, () =>
  console.log(`Orula server running on http://localhost:${SERVER_PORT}`)
);
