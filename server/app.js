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

const knex = require("knex")({
    client: "pg",
    connection: {
    host: "127.0.0.1",
    user: "cyf",
    password: "password",
    database: "orula",
    port: 5432
  }
});


// post '/classes/'
// app.post("/classes", (req, res) =>{
//   const body = req.body;
//   knex('classes').insert([{
//       class_id:
//       `${ body.class_id }`,
//       name: `${body.name}`,
//       created_at: `${body.created_at}`,
//       updated_at:`${
//       body.updated_at}`
//   }]).then(
//             data => {
//             res.send("successfully classes added");
//       });
// });

// // put '/classes/:id'
// app.put("/classes/:id",  (req, res) => {
//   const class_id = `${req.params.id}`;
//   const body = req.body;
//   knex('classes').where('class_id', '=', class_id).update({
//       name: `${ body.name }`,
//       created_at: `${body.created_at}`
//             }).then(data => {
//                res.json(data);
//            });
// });

// // delete '/classes/:id'
// app.delete("/classes/:id", (req, res) =>{
//   const class_id = `${req.params.id}`;
//   knex(classes).where(
//                 'class_id','=',class_id).del().then(
//                 data => {
//                  res.json(data);
//                  });
// });


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
