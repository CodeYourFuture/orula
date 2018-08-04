exports.up = function(knex, Promise) {
  return knex.raw(
    `
    CREATE  TABLE status (
        status varchar(200)
    )
    `
  );
};

exports.down = function(knex, Promise) {};
