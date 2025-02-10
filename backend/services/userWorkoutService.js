const UserWorkout = require("../models/userWorkout");
const { Op } = require("sequelize");

const getWorkoutsByUserIdAndDates = async (userId, startDate, endDate) => 
{
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
        throw error;
    }
};

const addWorkoutToUser = async(userId, title, date) => 
{
    try 
    {  
        const formatDate = new Date(date);
        return await UserWorkout.create({
            title: title,
            date: formatDate,
            userId: userId
        });
    } 
    catch (error) 
    {
        throw error;
    }
}

module.exports = { getWorkoutsByUserIdAndDates, addWorkoutToUser };
