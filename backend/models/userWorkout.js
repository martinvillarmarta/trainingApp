const { DataTypes } = require("sequelize");
const sequelize = require("../db/database"); 

const UserWorkout = sequelize.define("User_Workout", { 
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true }, 
    title: { type: DataTypes.STRING, allowNull: false }, 
    date: { type: DataTypes.DATE, allowNull: false }, 
    userId: { type: DataTypes.INTEGER, allowNull: false, references: { model: "User", key: "id" }, onDelete: "CASCADE" } 
  }, 
  { 
    tableName: "User_Workout", 
    timestamps: false 
  });

module.exports = UserWorkout;
