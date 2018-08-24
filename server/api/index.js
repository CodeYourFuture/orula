const express = require("express");
const router = express.Router();
const db = require("../helpers/db");

router.get("/status", (req, res) => res.send({ status: "OK" }));

// Get All Courses
router.get("/courses", (req, res) => {
  db.getCourses().then(data => {
    res.send(data);
  });
});

// Add Course
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

// Edit Course
router.put("/courses/:id", async (req, res) => {
  const course_id = req.params.id;
  const { name, location, organisation_id } = req.body;
  if (
    (await db.checkCourseExist(name)) === false &&
    name !== "" &&
    name !== null
  ) {
    await db.editCourse(course_id, name, location, organisation_id);
    res.send("Course is successfully updated!");
  } else {
    res
      .status(403)
      .send("This course is already exist or course name field is empty");
  }
});

// Delete Course
router.delete("/courses/:id", async (req, res) => {
  const course_id = req.params.id;
  try {
    await db.deleteCourse(course_id);
    res.send("Course was successfully deleted!");
  } catch (error) {
    res.status(403).send("Error occured! Please, try again.");
  }
});

// Add Organisation
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

// Get All Organisations
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
