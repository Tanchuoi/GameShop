const { DB_HOST, DB_PORT, DB_USER, DB_NAME } = process.env;

module.exports = require('knex')({
    client: 'mysql2',
    connection: {
        host: DB_HOST,
        port: DB_PORT,
        user: DB_USER,
        database: DB_NAME,
    },
    pool: { min: 0, max: 10 },
});