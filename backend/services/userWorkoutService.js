const UserWorkout = require("../models/userWorkout");
const { Op } = require("sequelize");

const getWorkoutsByUserIdAndDates = async (userId, startDate, endDate) => {
    try 
    {  
        const formatStartDate = new Date(startDate);
        const formatEndDate = new Date(endDate);

        return await UserWorkout.findAll({
            where: {
              userId: userId,
              date: { [Op.between]: [formatStartDate, formatEndDate] }
            },
        });
    } 
    catch (error) 
    {
        console.error("Error al obtener los entrenamientos del usuario:", error);
        throw error;
    }
};

module.exports = { getWorkoutsByUserIdAndDates };
