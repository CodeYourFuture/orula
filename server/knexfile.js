// Update with your config settings.
module.exports = {
  development: {
    client: "postgresql",
    connection: {
      host: process.env.DB_HOST || "127.0.0.1",
      database: process.env.DB_NAME || "orula",
      user: process.env.DB_USER || "cyf",
      password: process.env.DB_PASSWORD || "password"
    },
    
    pool: { min: 1, max: 100 },
    acquireConnectionTimeout: 10000,
    migrations: {
      tableName: "knex_migrations"
    }
  },

  staging: {
    client: "postgresql",
    connection: {
      host: process.env.DB_HOST,
      database: process.env.DB_NAME,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD
    },
    pool: { min: 1, max: 100 },
    acquireConnectionTimeout: 10000,
    migrations: {
      tableName: "knex_migrations"
    }
  },

  production: {
    client: "postgresql",
    connection: {
      host: process.env.DB_HOST,
      database: process.env.DB_NAME,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD
    },
    
    pool: { min: 1, max: 100 },
    acquireConnectionTimeout: 10000,
    migrations: {
      tableName: "knex_migrations"
    }
  }
};
