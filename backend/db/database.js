const mysql = require("mysql2");
const config = require("../config/db.config.js");

const pool = mysql.createPool({
    host: config.HOST,
    user: config.USER,
    password: config.PASSWORD,
    database: config.DB,
    port: config.PORT,
});

module.exports = pool.promise();
