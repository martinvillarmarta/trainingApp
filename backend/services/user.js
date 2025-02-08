const db = require("../db/database");

const getUserByEmail = async (email) => {
    try 
    {
        const [users] = await db.execute("SELECT * FROM users WHERE email = ? LIMIT 1", [email]);
        return users.length > 0 ? users[0] : null;
    } 
    catch (error) 
    {
        console.error("Error al obtener el usuario:", error);
        throw error;
    }
};

module.exports = { getUserByEmail };
