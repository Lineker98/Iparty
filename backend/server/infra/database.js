const pgp = require('pg-promise')();
const db = pgp({
    user: 'postgres',
    password: '0197346825',
    host: 'localhost',
    port: 5432,
    database: 'trabalhoBD'
})

module.exports = db;