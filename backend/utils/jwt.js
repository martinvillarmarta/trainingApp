const jwt = require("jsonwebtoken");
const config = require("../config/login.config.js");
const { sendMailjetMail } = require("../utils/mail");

const generateToken = async (user) => 
{
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

const validateToken = (token) => 
{
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

const registerAttempt = async (attemps, email) => 
{
  const seconds = Math.floor(Date.now() / 1000);
  if (!attemps[email]) 
  {
     attemps[email] = { count: 1, time: seconds };
  } 
  else 
  {
    if (seconds - attemps[email].time > 60) 
    {
          attemps[email] = { count: 1, time: seconds };
    }
    else
    {
      attemps[email] = { count: attemps[email].count + 1, time: attemps[email].time };
    }

    if (attemps[email].count >= 3) 
    {
      await sendMailjetMail("comunicacion@entrenavirtual.es", "Alerta de usuario con password incorrecta",
        `El usuario con mail ${email} ha intentado acceder tres veces seguidas con password incorrecta`,
        "administracion@entrenavirtual.es");
      delete attempts[email];
    }
  }  
  return attemps;  
}

module.exports = { generateToken, validateToken, registerAttempt };
      

      