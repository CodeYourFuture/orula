exports.seed = async (knex, Promise) => {
  // Deletes ALL existing entries
  await knex("topics").del();
  await knex("lessons").del();
  await knex("courses").del();
  await knex("organisations").del();

  const organisations = await knex("organisations")
    .returning("organisation_id")
    .insert([{ name: "CodeYourFuture" }]);

  const organisation_id = organisations[0];

  const courses = await knex("courses")
    .returning("course_id")
    .insert([
      {
        course_title: "scotland-class-1",
        location: "Glasgow",
        organisation_id
      },
      {
        course_title: "london-class-4",
        location: "London",
        organisation_id
      }
    ]);

  const lessons = await knex("lessons")
    .returning("lesson_id")
    .insert([
      {
        name: "JavaScript I - 1",
        module: "JS-1",
        course_id: courses[0]
      },
      {
        name: "JavaScript I - 2",
        module: "JS-1",
        course_id: courses[0]
      },
      {
        name: "JavaScript I - 2",
        module: "JS-1",
        course_id: courses[0]
      },
      {
        name: "Node I - 1",
        module: "Node",
        course_id: courses[0]
      }
    ]);

  await knex("topics")
    .returning("topic_id")
    .insert([
      {
        title: "For loops",
        lesson_id: lessons[0]
      },
      {
        title: "IF/else",
        lesson_id: lessons[0]
      },
      {
        title: "While loop",
        lesson_id: lessons[1]
      }
    ]);

    await knex("users").insert([
      {
        username: "islam",
        password: "islam123"
      }
    ])
};
