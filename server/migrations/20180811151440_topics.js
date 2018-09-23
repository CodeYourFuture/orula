exports.up = async (knex, Promise) => {
  await knex.schema.createTable("organisations", table => {
    table.increments("organisation_id");
    table.string("name");
    table.timestamps();
  });

  await knex.schema.createTable("courses", table => {
    table.increments("course_id");
    table.string("name");
    table.string("location");
    table.integer("organisation_id");
    table
      .foreign("organisation_id")
      .references("organisation_id")
      .inTable("organisations");
    table.timestamps();
  });

  await knex.schema.createTable("lessons", table => {
    table.increments("lesson_id");
    table.string("name");
    table.date("lesson_date");
    table.integer("course_id");
    table.string("module");
    table
      .foreign("course_id")
      .references("course_id")
      .inTable("courses");
  });

  await knex.schema.createTable("topics", table => {
    table.increments("topic_id");
    table.string("title");
    table.string("info");
    table.integer("order");
    table.integer("lesson_id");
    table
      .foreign("lesson_id")
      .references("lesson_id")
      .inTable("lessons");

    table.timestamps();
  });

  await knex.schema.createTable("users", table => {
    table.increments("user_id");
    table.string("name");
    table.string("email").unique();
    table.string("password");
  });

  await knex.schema.createTable("ratings", table => {
    table.increments("rating_id");
    table.integer("rating");
    table.integer("user_id");
    table.integer("topic_id");
    table
      .foreign("user_id")
      .references("user_id")
      .inTable("users");

    table
      .foreign("topic_id")
      .references("topic_id")
      .inTable("topics");
  });

  await knex.schema.createTable("users_courses", table => {
    table.integer("course_id");
    table.integer("user_id");
    table
      .foreign("user_id")
      .references("user_id")
      .inTable("users");

    table
      .foreign("course_id")
      .references("course_id")
      .inTable("courses");
  });
  await knex.schema.createTable("roles", table => {
    table.increments("role_id");
    table.string("name");
  });
  await knex.schema.createTable("user_roles", table => {
    table.increments("user_roles_id");
    table.integer("user_id");
    table.integer("role_id");
    table
      .foreign("user_id")
      .references("user_id")
      .inTable("users");

    table
      .foreign("role_id")
      .references("role_id")
      .inTable("roles");
  });
};

exports.down = async (knex, Promise) => {
  await knex.schema.dropTableIfExists("users_courses");
  await knex.schema.dropTableIfExists("user_roles");
  await knex.schema.dropTableIfExists("ratings");
  await knex.schema.dropTableIfExists("users");
  await knex.schema.dropTableIfExists("roles");
  await knex.schema.dropTableIfExists("topics");
  await knex.schema.dropTableIfExists("lessons");
  await knex.schema.dropTableIfExists("courses");
  await knex.schema.dropTableIfExists("organisations");
};
