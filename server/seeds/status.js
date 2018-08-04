exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("status")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("status").insert([{ status: "OK" }]);
    });
};
