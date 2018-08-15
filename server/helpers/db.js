const config = require("../knexfile")[process.env.NODE_ENV || "development"];

const knex = require("knex")(config);

const getCourses = () => {
  return knex.select().from("courses");
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
