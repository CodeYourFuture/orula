const config = require("../knexfile")[process.env.NODE_ENV || "development"];

const knex = require("knex")(config);

const getCourses = () => {
  return knex
    .select()
    .from("courses")
    .join(
      "organisations",
      "courses.organisation_id",
      "=",
      "organisations.organisation_id"
    );
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

const getCourseById = course_id => {
  return knex
    .select()
    .from("courses")
    .where("course_id", "=", course_id);
};

const getOrganisations = () => {
  return knex.select().from("organisations");
};

const getOrganisationsById = course_id => {
  return knex
    .select()
    .from("organisations")
    .where("organisation_id", "=", organisation_id);
};

const checkOrganisationExist = name => {
  const result = knex
    .select()
    .from("organisations")
    .where("name", "=", name);
  return result.length === 0 ? false : true;
};

const addOrganisation = name => {
  return knex("organisations").insert({ name: name });
};

module.exports = {
  getCourses,
  getCourseById,
  getOrganisations,
  getOrganisationsById,
  addOrganisation,
  checkOrganisationExist,
  getSingleUser,
  getUserProfile
};
