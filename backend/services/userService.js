const User = require("../models/user");

const getUserByEmail = async (email) => 
{
    try 
    {
        const user = await User.findOne({ where: { email } });
        return user ? user.toJSON() : null;
    } 
    catch (error) 
    {
        throw error;
    }
};

module.exports = { getUserByEmail };
