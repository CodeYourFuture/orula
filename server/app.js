const SERVER_PORT = process.env.PORT || 4000; // setup the server port number
const express = require("express");
const exphbs = require("express-handlebars");
const cors = require("cors");
const api = require("./api");
const admin = require("./admin");

const app = express();

app.engine(
  "hbs",
  exphbs({
    defaultLayout: "main",
    extname: "hbs"
  })
);

//let pg = require("pg");

var knex = require("knex")({
  client: "pg",
  connection: {
    host: "127.0.0.1",
    user: "cyf",
    password: "password",
    database: "orula",
    port: 5432
  }
});

// get '/classes'
app.get("/classes", (req, res) => {
  const sqlStatement = "select * from classes";
  knex.raw(sqlStatement).then(data => {
    res.json(data);
  });
});
const callBack = (error, classes) => {
  if (error) {
    console.error(error);
    res.sendStatus(500);
  } else {
    res.json(classes);
  }
};
// get '/classes/:id'
app.get("/classes/class_id/:id", (req, res) => {
  const sqlStatement = `select * from classes where class_id =${req.params.id}`;
  knex.raw(sqlStatement).then(data => {
    res.json(data);
  });
});
// post '/classes/'
app.post("/classes", function(req, res) {
  const body = req.body;
  const sqlStatement = `INSERT INTO classes
  (class_id,name, created_at, updated_at) 
  VALUES ("${body.class_id}", "${body.name}", "${body.created_at}", "${
    body.updated_at
  }");`;
  knex.raw(sqlStatement).then(data => {
    //console.log(req.body)
    res.send("successfully classes added");
  });
});
// put '/classes/:id'
app.put("/classes/:id", function(req, res) {
  const id = req.params.id;
  const body = req.body;
  const sqlStatement = `update classes
    set name= "${body.name}",created_at= "${
    body.created_at
  }" where class_id = ${id}`;
  knex.raw(sqlStatement).then(data => {
    res.json(data);
  });
});
// delete '/classes/:id'
app.delete("/classes/:id", function(req, res) {
  const id = req.params.id;
  //const body = req.body
  const sqlStatement = `delete from classes
      where class_id = ${id}`;
  knex.raw(sqlStatement).then(data => {
    res.json(data);
  });
});

app.set("view engine", "hbs");

app.use(cors());

app.get("/", (req, res) => {
  res.render("home");
});

app.use("/admin", admin);

app.use("/api", api);

app.listen(SERVER_PORT, () =>
  console.log(`Orula server running on http://localhost:${SERVER_PORT}`)
);
