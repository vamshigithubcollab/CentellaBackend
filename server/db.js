const Pool = require("pg").Pool;

const pool = new Pool({
    user:"postgres",
    password:"123456",
    hostname:"localhost",
    port:5432,
    database:"authorisation"
})

module.exports = pool;