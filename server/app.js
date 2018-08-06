const SERVER_PORT = process.env.PORT || 4000; // setup the server port number
const express = require("express");
const exphbs = require("express-handlebars");
const cors = require("cors");

const app = express();

app.engine("hbs", exphbs({
  defaultLayout: "main",
  extname: "hbs"
}));

app.set("view engine", "hbs");

app.use(cors());

app.get("/", (req, res) => {
  res.render("home");
});

app.get("/admin/courses", (req, res) => {
  res.render("courses");
});

app.get("/api/status", (req, res) => res.send({ status: "OK" }));

app.listen(SERVER_PORT, () =>
  console.log(`Orula server running on ${SERVER_PORT}`)
);
