const config = require("../knexfile")[process.env.NODE_ENV || "development"];

const knex = require("knex")(config);

const getClasses = () => {
    return consol.log(knex.select().from("classes"));
};

module.exports = {
    getClasses: getClasses
};