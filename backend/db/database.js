const mysql = require("mysql2");
const config = require("../config/db.config.js");

const DBconexion = async () => {
    const pool = mysql.createPool({
        host: config.HOST,
        user: config.USER,
        password: config.PASSWORD,
        database: config.DB,
        port: config.PORT,
    });

    pool.getConnection((err, connection) => {
    if (err) 
    {
        console.error("Error:", err.code, err.message);
        return;
    }

    console.log("Connected to the MySQL database");
    connection.release();
    });

    return pool;
};

module.exports = DBconexion;
