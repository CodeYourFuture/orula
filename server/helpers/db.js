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
  return await knex
    .select()
    .table("lessons")
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

const checkTopicExist = async title => {
  const response = await knex("topics").where({ title });
  return response.length === 0 ? false : true;
};

const deleteTopic = async topic_id => {
  return await knex("topics")
    .where({ topic_id })
    .del();
};

const addTopics = async (title, lesson_id) => {
  return await knex("topics").insert({
    title,
    lesson_id
  });
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
  getTopicsByLessonId,
  checkTopicExist,
  deleteTopic,
  addTopics
};
