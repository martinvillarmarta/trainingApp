const { DataTypes } = require("sequelize");
const sequelize = require("../db/database");

const User = sequelize.define("User", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  password: { type: DataTypes.STRING, allowNull: false },
  dateOfBirth: { type: DataTypes.DATE, allowNull: false },
  age: { type: DataTypes.INTEGER, allowNull: false }
}, 
{ 
  tableName: "User", 
  timestamps: false 
});

module.exports = User;