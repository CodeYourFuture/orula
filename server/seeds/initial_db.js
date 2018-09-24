exports.seed = async (knex, Promise) => {
  // Deletes ALL existing entries
  await knex("user_roles").del();
  await knex("roles").del();
  await knex("users").del();
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
        name: "scotland-class-1",
        location: "Glasgow",
        organisation_id
      },
      {
        name: "london-class-4",
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
        course_id: courses[0],
        lesson_date: "12/12/2017"
      },
      {
        name: "JavaScript I - 2",
        module: "JS-1",
        course_id: courses[0],
        lesson_date: "12/11/2017"
      },
      {
        name: "JavaScript I - 2",
        module: "JS-1",
        course_id: courses[0],
        lesson_date: "12/12/2018"
      },
      {
        name: "Node I - 1",
        module: "Node",
        course_id: courses[0],
        lesson_date: "12/02/2017"
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

  const users = await knex("users")
    .returning("user_id")
    .insert([
      {
        name: "Islam",
        email: "islam@email.com",
        password: "islam123"
      },
      {
        name: "student",
        email: "student@student.com",
        password: "password"
      },
      {
        name: "admin",
        email: "admin@admin.com",
        password: "password"
      },
      {
        name: "mentor",
        email: "mentor@mentor.com",
        password: "password"
      }
    ]);

  const roles = await knex("roles")
    .returning("role_id")
    .insert([
      {
        name: "Admin"
      },
      {
        name: "Mentor"
      },
      {
        name: "Student"
      }
    ]);

  await knex("user_roles").insert([
    {
      user_id: users[0],
      role_id: roles[0]
    },
    {
      user_id: users[0],
      role_id: roles[1]
    },
    {
      user_id: users[1],
      role_id: roles[2]
    },
    {
      user_id: users[2],
      role_id: roles[0]
    },
    {
      user_id: users[3],
      role_id: roles[1]
    }
  ]);
};
