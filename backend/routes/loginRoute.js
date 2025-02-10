const bcrypt = require("bcryptjs");
const express = require("express");
const { getUserByEmail } = require("../services/userService");
const { generateToken, validateToken } = require("../utils/jwt");
const router = express.Router();

router.post("/", async (req, res) => 
{
    try 
    {
      const { email, password } = req.body;
      const user = await getUserByEmail(email);
      if (user === null)
        return res.status(401).json();

      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword)
        return res.status(401).json();

      const token = await generateToken(user);
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
    res.status(200).json({ valid: true });
  } 
  else 
  {
    res.status(401).json({ valid: false });
  }
});
  
module.exports = router;
