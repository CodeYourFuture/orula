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

// Get 1 Course
router.get("/courses/:id", (req, res) => {
  const course_id = req.params.id;
  db.getCourseById(course_id).then(data => {
    res.send(data);
  });
});

// Add Course
router.post("/courses", async (req, res) => {
  const { name, location, organisation_id } = req.body;
  if (
    (await db.checkCourseExist(name, organisation_id)) === false &&
    name !== "" &&
    name !== null
  ) {
    await db.addCourse(name, location, organisation_id);
    res.send("Successfully added course!");
  } else {
    res
      .status(403)
      .send("This course already exist or course name field is empty");
  }
});

// Edit Course
router.put("/courses/:id", async (req, res) => {
  const course_id = req.params.id;
  const { name, location, organisation_id } = req.body;
  if (
    (await db.checkCourseExist(name, organisation_id)) === false &&
    name !== "" &&
    name !== null
  ) {
    await db.editCourse(course_id, name, location, organisation_id);
    res.send("Course is successfully updated!");
  } else {
    res
      .status(403)
      .send("This course already exist or course name field is empty");
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

// Get Organisations by Id
router.get("/organisations/:id", (req, res) => {
  const organisation_id = req.params.id;
  db.getOrganisationsById(organisation_id).then(data => {
    res.send(data);
  });
});

router.delete("/organisations/:id", async (req, res) => {
  const organisation_id = req.params.id;
  if ((await db.checkOrganisationToDelete(organisation_id)) === false) {
    db.deleteOrganisation(organisation_id).then(() => {
      res.send("Successfully deleted organisation!");
    });
  } else {
    res.status(403).send("This organisation isn't empty. It has some courses!");
  }
});

router.put("/organisations/:organisation_id", async (req, res) => {
  const organisation_id = req.params.organisation_id;
  const body = req.body;
  if (
    (await db.checkOrganisationExist(body.name)) === false &&
    body.name !== "" &&
    body.name !== null
  ) {
    await db.updateOrganisation(organisation_id, body.name);
    res.send("Organisation is successfully updated!");
  } else {
    res.status(403).send("This organisation is already exists.");
  }
});

// Get All Lessons
router.get("/lessons", (req, res) => {
  db.getLessons().then(data => {
    res.send(data);
  });
});

// Get 1 Lesson
router.get("/lessons/:id", (req, res) => {
  const lesson_id = req.params.id;
  db.getLessonsById(lesson_id).then(data => {
    res.send(data);
  });
});

// Edit Lesson
router.put("/lessons/:id", async (req, res) => {
  const lesson_id = req.params.id;
  const { name, lesson_date, course_id } = req.body;
  if (
    (await db.checkLessonExist(name, lesson_date, course_id)) === false &&
    name !== "" &&
    name !== null
  ) {
    await db.editLesson(lesson_id, name, lesson_date, course_id);
    res.send("Lesson is successfully updated!");
  } else {
    res
      .status(403)
      .send("This lesson already exists or lesson name/date field is empty");
  }
});

router.delete("/lessons/:id", async (req, res) => {
  const lesson_id = req.params.id;
  if ((await db.checkLessonToDelete(lesson_id)) !== false) {
    await db.deleteLesson(lesson_id);
    res.send("Successfully deleted Lesson!");
  } else {
    res.status(403).send("This lesson isn't empty. It has some data!");
  }
});

// Add Course
router.post("/lessons", async (req, res) => {
  const { name, lesson_date, course_id } = req.body;
  if (
    (await db.checkLessonExist(name, lesson_date, course_id)) === false &&
    name !== "" &&
    name !== null
  ) {
    await db.addLesson(name, lesson_date, course_id);
    res.send("Successfully added lesson!");
  } else {
    res
      .status(403)
      .send("This lesson is already exist or lesson name field is empty");
  }
});

// Get topics by lessonId
router.get("/topics", async (req, res) => {
  const lessonId = req.query.lessonId;
  const data = await db.getTopicsByLessonId(lessonId);
  res.send(data);
});

// Delete a topic
router.delete("/topics/:id", async (req, res) => {
  const topic_id = req.params.id;
  if ((await db.checkTopicExist(topic_id)) === false) {
    await db.deleteTopic(topic_id);
    res.send("Successfully deleted topic!");
  } else {
    res.status(403).send("This topic isn't empty. It has some data!");
  }
});

// Add Topics
router.post("/topics", async (req, res) => {
  const body = req.body;
  if (
    (await db.checkTopicExist(body.title)) === false &&
    body.name !== "" &&
    body.name !== null
  ) {
    await db.addTopics(body.title, body.lesson_id);
    res.send("Successfully added course!");
  } else {
    res
      .status(403)
      .send("This topic is already exists or your name field is empty");
  }
});

router.put("/topics/:id", async (req, res) => {
  const topicId = req.params.id;
  const body = req.body;
  if (
    (await db.checkTopicExist(body.title)) === false &&
    body.title !== "" &&
    body.title !== null
  ) {
    await db.updateTopic(topicId, body.title);
    res.send("Topic is successfully updated!");
  } else {
    res.status(403).send("This topic is already exists.");
  }
});

router.get("/topics/:id", async (req, res) => {
  const topicId = req.params.id;
  const data = await db.getTopicById(topicId);
  res.send(data);
});
// Add User
router.post("/users", async (req, res) => {
  const { name, email, password } = req.body;
  if (
    (await db.checkUserByEmailExist(email)) === false &&
    name !== "" &&
    name !== null &&
    email !== "" &&
    email !== null
  ) {
    await db.addUser(name, email, password);
    res.send("Successfully added course!");
  } else {
    res
      .status(403)
      .send("This course is already exist or course name field is empty");
  }
});

// Get All Users
router.get("/users", (req, res) => {
  db.getUsers().then(data => {
    res.send(data);
  });
});

module.exports = router;
