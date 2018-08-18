const config = require("../knexfile")[process.env.NODE_ENV || "development"];

const knex = require("knex")(config);

const getCourses = () => {
  return knex
    .select(
      "courses.course_title as courseTitle",
      "courses.location",
      "organisations.name as organisationName",
      "lessons.name as lessonName",
      "topics.title as topicsTitle"
    ) // we renamed name into a more specific key name to make the difference between organisation name and lesson name
    .from("courses")
    .join(
      "organisations",
      "courses.organisation_id",
      "=",
      "organisations.organisation_id"
    )
    .join("lessons", "courses.course_id", "=", "lessons.course_id")
    .join("topics", "lessons.lesson_id", "=", "topics.lesson_id");
};

const getCourseById = course_id => {
  return knex
    .select()
    .from("courses")
    .where("course_id", "=", course_id);
};

module.exports = {
  getCourses,
  getCourseById
};
