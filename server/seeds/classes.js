exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("classes")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("classes").insert([
        { name: "JavaScript I - Week 1" },
        { name: "JavaScript I - Week 2" },
        { name: "JavaScript I - Week 3" },
        { name: "JavaScript II - Week 4" }
      ]);
    });
};
