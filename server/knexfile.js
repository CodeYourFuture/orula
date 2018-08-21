module.exports = {
  client: "postgresql",
  connection: {
    host: process.env.DATABASE_URL || "localhost",
    database: process.env.DB_NAME || "orula",
    user: process.env.DB_USER || "cyf",
    password: process.env.DB_PASSWORD || "password"
  },
  pool: {
    min: 2,
    max: 10
  },
  migrations: {
    tableName: "knex_migrations"
  }
};
