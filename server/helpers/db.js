const config = require("../knexfile")[process.env.NODE_ENV || "development"];

const knex = require("knex")(config);

const getClasses = () => {
    return knex.select().from("classes");
};

module.exports = {
    getClasses: getClasses
};