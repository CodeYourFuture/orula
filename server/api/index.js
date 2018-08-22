const express = require("express");
const router = express.Router();
const db = require("../helpers/db");

router.get("/status", (req, res) => res.send({ status: "OK" }));

// get '/courses'
router.get("/courses", (req, res) => {
  db.getCourses().then(data => {
    res.send(data);
  });
});



// post '/courses/'
router.post("/courses", (req, res) => {
  const body = req.body;
  db.getCourses()
    .insert([
      {
        course_id: `${body.course_id}`,
        name: `${body.name}`,
        created_at: `${body.created_at}`,
        updated_at: `${body.updated_at}`
      }
    ])
    .then(data => {
      res.send("successfully added courses");
    });
});

// put '/courses/:id'
router.put("/courses/:id", (req, res) => {
  const course_id = `${req.params.id}`;
  const body = req.body;
  db.getCourses()
    .where("course_id", "=", course_id)
    .update({
      name: "JavaScriptI"
      // created_at: `${body.created_at}`
    })
    .then(data => {
      res.json(data);
    });
});

// delete '/courses/:id'
router.delete("/courses/:id", (req, res) => {
  const course_id = `${req.params.id}`;
  db.getCourses()
    .where("course_id", "=", course_id)
    .del()
    .then(data => {
      res.json(data);
    });
});

router.post("/organisations", (req, res) => {
  const body = req.body;
  if (
    db.checkOrganisationExist(body.name) === false &&
    body.name !== "" &&
    body.name !== null
  ) {
    db.addOrganisation(body.name).then(() => res.send());
  } else {
    res.status(500);
    res.send("This organisation is already exists or your name field is empty");
  }
});

router.get("/organisations", (req, res) => {
  db.getOrganisations().then(data => {
    res.send(data);
  });
});
router.get("/courses/:id", (req, res) => {
  const course_id = `${req.params.id}`;
  db.getLessonsById(course_id).then(data => {
    res.send(data);
  });
});

module.exports = router;
