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



// Endpoint to add new course to the DB
router.post("/courses", async (req, res) => {
  const { name, location, organisation_id } = req.body;
  if (
    (await db.checkCourseExist(name)) === false &&
    name !== "" &&
    name !== null
  ) {
    await db.addCourse(name, location, organisation_id);
    res.send("Successfully added course!");
  } else {
    res
      .status(403)
      .send("This course is already exist or course name field is empty");
  }
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

// Endpoint for Add Organisation to DB
router.post("/organisations", async (req, res) => {
  const body = req.body;
  if (
    (await db.checkOrganisationExist(body.name)) === false &&
    body.name !== "" &&
    body.name !== null
  ) {
    await db.addOrganisation(body.name);
    res.send();
  } else {
    res
      .status(403)
      .send("This organisation is already exists or your name field is empty");
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

// Get Organisations by Id
router.get("/organisations/:id", (req, res) => {
  const organisation_id = req.params.id;
  db.getOrganisationsById(organisation_id).then(data => {
    res.send(data);
  });
});

module.exports = router;
