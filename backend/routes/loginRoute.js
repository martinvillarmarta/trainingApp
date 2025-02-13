const bcrypt = require("bcryptjs");
const express = require("express");
const { getUserByEmail } = require("../services/userService");
const { generateToken, validateToken, registerAttempt } = require("../utils/jwt");
const router = express.Router();
attempts = []

router.post("/", async (req, res) => 
{
    try 
    {
      const { email, password } = req.body;
      const user = await getUserByEmail(email);
      if (user === null)
      {
        return res.status(401).json("Creedenciales incorrectas");
      }

      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword)
      {
          attempts = await registerAttempt(attempts, email);
          return res.status(401).json("Creedenciales incorrectas");
      }
      const token = await generateToken(user);
      if (attempts[email]) 
      {
        delete attempts[email]; 
      }
      return res.status(200).json({ token, user });
    } 
    catch (error) 
    {
        const message = "Error en el proceso de login";
        console.log(message + error);
        res.status(500).json({ error: message });
    }
  });

router.get("/", async (req, res) => 
{
  const token = req.headers.authorization?.split(" ")[1];
  const isValid = validateToken(token);
  if (isValid)
  {
    return res.status(200).json({ valid: true });
  } 
  else 
  {
    return res.status(401).json({ valid: false });
  }
});
  
module.exports = router;
