const jwt = require("jsonwebtoken");
const config = require("../config/login.config.js");

const generateToken = async (user) => {
    try 
    {
        const payload = { 
            id: user.id, 
            email: user.email 
          };
          const time = "1m";
          const token = jwt.sign(payload, config.JWT_SECRET, { expiresIn: time });
          return token;
    } 
    catch (error) 
    {
        console.error("Error al generar el token", error);
        throw error;
    }
};

const validateToken = (token) => {
    try 
    {
      jwt.verify(token, config.JWT_SECRET);
      return true;
    } 
    catch (error) 
    {
      return false;
    }
  };

module.exports = { generateToken, validateToken };
      

      