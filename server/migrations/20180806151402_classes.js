exports.up = function(knex, Promise) {
  return knex.schema.createTable("classes", table => {
    table.increments("class_id");
    table.string("name");
    table.timestamps();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("classes");
};
