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
      .send("This course already exists or course name field is empty");
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
      .send("This course already exists or course name field is empty");
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
      .send("This organisation already exists or your name field is empty");
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
    res.status(403).send("This organisation already exists.");
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
      .send("This lesson already exist or lesson name field is empty");
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
      .send("This topic already exists or your name field is empty");
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
    res.status(403).send("This topic already exists.");
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
    const userId = await db.addUser(name, email, password);
    await db.addRoleToUser(userId[0], 3); // Add default role "Student" to new user
    res.send("Successfully added course!");
  } else {
    res.status(403).send("This user already exist or user name field is empty");
  }
});

// Get All Users
router.get("/users", (req, res) => {
  db.getUsers().then(data => {
    res.send(data);
  });
});

// Get user roles
router.get("/user-roles", async (req, res) => {
  const data = await db.getUsersWithRoles();
  const newData = data.reduce((result, current) => {
    const userId = current.user_id;
    if (result[userId]) {
      // create roles array inside user roles object and push current role to it
      result[userId]["roles"].push(current.role);
    } else {
      //create an object with user id, name, email
      result[userId] = {
        name: current.name,
        user_id: current.user_id,
        email: current.email
      };
      // add current role to roles array inside the object
      result[userId]["roles"] = [current.role];
    }
    return result;
  }, {});
  // send only values of newData
  res.send(Object.values(newData));
});

router.get("/user-roles/:id", async (req, res) => {
  const userId = req.params.id;
  const data = await db.getUserRoles(userId);
  res.send(data);
});

// Add user roles to the user_roles table
router.post("/user-roles", async (req, res) => {
  const body = req.body;
  try {
    await db.clearRolesByUser(body.user_id);
    body.roles.forEach(
      async role_id => await db.addRoleToUser(body.user_id, role_id)
    );
    res.send("Successfully assigned roles!");
  } catch (error) {
    res.status(403).send("Sorry, couldn't add roles.");
  }
});

router.get("/roles", async (req, res) => {
  const data = await db.getRoles();
  res.send(data);
});
// Add user to the course table
router.post("/enrol", async (req, res) => {
  const body = req.body;
  try {
    await db.assignUserToCourse(body.course_id, body.user_id);
    res.send("Successfully assigned course!");
  } catch (error) {
    res.send("Error, please try again!");
  }
});
// Get students by Id
router.get("/courses/:id/students", (req, res) => {
  const course_id = req.params.id;
  db.getStudentsByCourseId(course_id).then(data => {
    res.send(data);
  });
});

router.get("/students", async (req, res) => {
  const data = await db.getStudentsAndMentor();
  res.send(data);
});

router.get("/user-courses/:id", async (req, res) => {
  const userId = req.params.id;
  const data = await db.getCoursesByUser(userId);
  res.send(data);
});

router.get("/ratings/:lesson_id", async (req, res) => {
  const { user_id } = req.user;
  const { lesson_id } = req.params;
  const data = await db.getRatings(user_id, lesson_id);
  res.send(data);
});

router.get("/student-ratings/:topic_id", async (req, res) => {
  const { topic_id } = req.params;
  const data = await db.getStudentRatingsByTopic(topic_id);
  res.send(data);
});

router.post("/ratings/:lessonId", async (req, res) => {
  const { user_id } = req.user;
  const { ratings } = req.body;
  const { lessonId } = req.params;

  const ratingsToSave = ratings.map(rating => {
    const {
      topic_id,
      rating_before,
      rating_after,
      rating_3days,
      rating_1week
    } = rating;
    return {
      topic_id,
      rating_before,
      rating_after,
      rating_3days,
      rating_1week,
      user_id
    };
  });

  try {
    await db.addRatings(user_id, lessonId, ratingsToSave);

    const data = await db.getRatings(user_id, lessonId);
    res.send(data);
  } catch (error) {
    console.error(error);
    res.status(500).send("Sorry, couldn't save ratings.");
  }
});

module.exports = router;
