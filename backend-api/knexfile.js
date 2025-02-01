require("dotenv").config();
const { DB_HOST, DB_PORT, DB_USER, DB_NAME } = process.env;
/**
 * @type { import("knex").Knex.Config }
 */
module.exports = {
  development: {
    client: "mysql2",
    connection: {
      host: DB_HOST,
      port: DB_PORT,
      user: DB_USER,
      database: DB_NAME,
    },
    migrations: {
      directory: "./migrations",
    },
    seeds: {
      directory: "./seeds",
    },
  },
};
