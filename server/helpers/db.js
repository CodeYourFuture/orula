const config = require("../knexfile")[process.env.NODE_ENV || "development"];
const knex = require("knex")(config);

const getCourses = () => {
  return knex
    .select(
      "course_id",
      "courses.name as name",
      "location",
      "organisations.name as organisation_title"
    )
    .from("courses")
    .innerJoin(
      "organisations",
      "courses.organisation_id",
      "organisations.organisation_id"
    )
    .orderBy("course_id", "asc");
};

const getCourseById = course_id => {
  return knex("courses").where({ course_id });
};

const checkCourseExist = async (name, organisation_id) => {
  const response = await knex("courses").where({ name, organisation_id });
  return response.length === 0 ? false : true;
};

const addCourse = async (name, location, organisation_id) => {
  return await knex("courses").insert({
    name,
    location,
    organisation_id
  });
};

const editCourse = async (course_id, name, location, organisation_id) => {
  return await knex("courses")
    .where({ course_id })
    .update({
      name,
      location,
      organisation_id
    });
};

const deleteCourse = async course_id => {
  return await knex("courses")
    .where({ course_id })
    .del();
};

const getSingleUser = (email, password) => {
  return knex("users")
    .where({ email, password })
    .first();
};

const getUserProfile = userId => {
  return knex("users")
    .select("user_id", "email", "name")
    .where({ user_id: userId })
    .first();
};

const getOrganisations = async () => {
  return await knex
    .select()
    .table("organisations")
    .orderBy("organisation_id", "asc");
};

const getOrganisationsById = organisation_id => {
  return knex("organisations").where({ organisation_id });
};

const checkOrganisationExist = async name => {
  const response = await knex("organisations").where({ name });
  return response.length === 0 ? false : true;
};

const addOrganisation = async name => {
  return await knex("organisations").insert({ name });
};

const updateOrganisation = async (organisation_id, organisationName) => {
  return await knex("organisations")
    .where("organisation_id", "=", `${organisation_id}`)
    .update({ name: organisationName });
};

const checkOrganisationToDelete = async organisation_id => {
  const response = await knex("courses").where({ organisation_id });
  return response.length === 0 ? false : true;
};

const deleteOrganisation = async organisation_id => {
  await knex("organisations")
    .where("organisation_id", "=", organisation_id)
    .del();
};

const getLessonsById = lesson_id => {
  return knex
    .select()
    .from("lessons")
    .where("lesson_id", "=", lesson_id);
};
const getLessons = async () => {
  return knex
    .select(
      "lesson_id",
      "lessons.name as name",
      "lesson_date",
      "courses.name as course_title"
    )
    .from("lessons")
    .innerJoin("courses", "lessons.course_id", "courses.course_id")
    .orderBy("lesson_id", "asc");
};

const checkLessonToDelete = async lesson_id => {
  const response = await knex("lessons").where({ lesson_id });
  return response.length === 0 ? false : true;
};

const deleteLesson = async lesson_id => {
  return await knex("lessons")
    .where("lesson_id", "=", lesson_id)
    .del();
};
const getTopicsByLessonId = async lesson_id => {
  return await knex
    .select()
    .table("topics")
    .where({ lesson_id })
    .orderBy("topic_id", "asc");
};
const getTopicById = async topic_id => {
  return await knex
    .select()
    .table("topics")
    .where({ topic_id });
};

const checkTopicExist = async title => {
  const response = await knex("topics").where({ title });
  return response.length === 0 ? false : true;
};

const deleteTopic = async topic_id => {
  return await knex("topics")
    .where({ topic_id })
    .del();
};

const addLesson = async (name, lesson_date, course_id) => {
  return await knex("lessons").insert({
    name,
    lesson_date,
    course_id
  });
};

const editLesson = async (lesson_id, name, lesson_date, course_id) => {
  return await knex("lessons")
    .where({ lesson_id })
    .update({
      name,
      lesson_date,
      course_id
    });
};

const checkLessonExist = async (name, lesson_date, course_id) => {
  const response = await knex("lessons").where({
    name,
    lesson_date,
    course_id
  });
  return response.length === 0 ? false : true;
};

const addTopics = async (title, lesson_id) => {
  return await knex("topics").insert({
    title,
    lesson_id
  });
};

const updateTopic = async (topic_id, name) => {
  return await knex("topics")
    .where({ topic_id })
    .update({ title: name });
};
const getUsers = async () => {
  return await knex
    .select()
    .table("users")
    .orderBy("user_id", "asc");
};

const getStudents = async () => {
  return await knex
    .select("users.user_id as userId", "users.name as studentName")
    .table("users")
    .innerJoin("user_roles", "users.user_id", "user_roles.user_id")
    .innerJoin("roles", "roles.role_id", "user_roles.role_id")
    .where("roles.name", "=", "Student");
};

const getStudentRatingsByTopic = async topic_id => {
  return await knex
    .select()
    .table("ratings")
    .innerJoin("users", "users.user_id", "ratings.user_id")
    .where("ratings.topic_id", "=", topic_id);
};

const getUsersWithRoles = () => {
  return knex
    .select(
      "users.user_id as user_id",
      "users.name as name",
      "email",
      "roles.name as role"
    )
    .from("users")
    .innerJoin("user_roles", "users.user_id", "user_roles.user_id")
    .innerJoin("roles", "roles.role_id", "user_roles.role_id");
};

const getCoursesByUser = async user_id => {
  return await knex
    .select("courses.course_id as courseId", "courses.name as courseName")
    .from("courses")
    .innerJoin("users_courses", "courses.course_id", "users_courses.course_id")
    .innerJoin("users", "users.user_id", "users_courses.user_id")
    .where({ "users.user_id": user_id });
};

const getUserRoles = async user_id => {
  return knex
    .select("users.name as name", "email", "roles.name as role")
    .from("users")
    .innerJoin("user_roles", "users.user_id", "user_roles.user_id")
    .innerJoin("roles", "roles.role_id", "user_roles.role_id")
    .where({ "users.user_id": user_id });
};

const clearRolesByUser = async user_id => {
  return await knex("user_roles")
    .where({ user_id })
    .del();
};
const assignUserToCourse = async (course_id, user_id) => {
  return await knex("users_courses")
    .returning("user_id")
    .insert({
      course_id,
      user_id
    });
};

const checkUserHasRole = async user_id => {
  const response = await knex("user_roles").where({ user_id });
  return response.length === 0 ? false : true;
};

const addRoleToUser = async (user_id, role_id) => {
  return await knex("user_roles").insert({ user_id, role_id });
};

const addUser = async (name, email, password) => {
  return await knex("users")
    .returning("user_id")
    .insert({
      name,
      email,
      password
    });
};

const checkUserByNameExist = async name => {
  const response = await knex("users").where({ name });
  return response.length === 0 ? false : true;
};

const checkUserByEmailExist = async email => {
  const response = await knex("users").where({ email });
  return response.length === 0 ? false : true;
};

const isEmailAvailableForCurrentUser = async (email, userId) => {
  const response = await knex("users")
    .whereNot("user_id", userId)
    .andWhere("email", email);
  return response.length === 0 ? true : false;
};

const updateUserProfile = async (user_id, name, email, password) => {
  return await knex("users")
    .where("user_id", "=", `${user_id}`)
    .update({
      name: name,
      email: email,
      password: password
    });
};

const getRoles = async () => {
  return await knex
    .select()
    .table("roles")
    .orderBy("role_id", "asc");
};

const getStudentsByCourseId = async course_id => {
  return knex
    .select("users.user_id as userId", "users.name as userName")
    .from("users")
    .innerJoin("users_courses", "users.user_id", "users_courses.user_id")
    .innerJoin("courses", "courses.course_id", "users_courses.course_id")
    .where({ "courses.course_id": course_id });
};

const getRatings = async (user_id, lesson_id) => {
  return await knex
    .select()
    .table("ratings")
    .innerJoin("topics", "topics.topic_id", "ratings.topic_id")
    .where({
      "topics.lesson_id": lesson_id,
      "ratings.user_id": user_id
    });
};

const addRatings = async (user_id, lesson_id, ratings) => {
  // Deleting ratings that belong to that specific topic
  if (lesson_id) {
    await knex("ratings")
      .where("ratings.user_id", user_id)
      .whereIn("topic_id", function() {
        this.select("topic_id")
          .from("topics")
          .where({ lesson_id });
      })
      .delete();
  }

  return await knex("ratings").insert(ratings);
};

module.exports = {
  getCourses,
  getCourseById,
  addCourse,
  editCourse,
  deleteCourse,
  checkCourseExist,
  getOrganisations,
  getOrganisationsById,
  addOrganisation,
  checkOrganisationExist,
  getSingleUser,
  getUserProfile,
  checkOrganisationToDelete,
  deleteOrganisation,
  getLessonsById,
  updateOrganisation,
  getLessons,
  checkLessonToDelete,
  deleteLesson,
  addLesson,
  editLesson,
  checkLessonExist,
  getTopicsByLessonId,
  checkTopicExist,
  deleteTopic,
  addTopics,
  updateTopic,
  getTopicById,
  getUsers,
  getUsersWithRoles,
  getUserRoles,
  clearRolesByUser,
  addRoleToUser,
  checkUserHasRole,
  addUser,
  checkUserByNameExist,
  checkUserByEmailExist,
  updateUserProfile,
  getRoles,
  isEmailAvailableForCurrentUser,
  assignUserToCourse,
  getStudentsByCourseId,
  getStudents,
  getCoursesByUser,
  getCoursesByUser,
  getRatings,
  addRatings,
  getStudentRatingsByTopic
};
