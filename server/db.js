const Pool = require("pg").Pool;

const pool = new Pool({
    user:"postgres",
    password:"manasa@2005",
    hostname:"localhost",
    port:5432,
    database:"postgres"
})

module.exports = pool;