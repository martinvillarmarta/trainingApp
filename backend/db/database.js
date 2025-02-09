const config = require("../config/db.config.js");
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
    host: config.HOST,
    dialect: "mysql",
    logging: false
});

module.exports = sequelize;