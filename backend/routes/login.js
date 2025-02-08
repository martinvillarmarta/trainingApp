const bcrypt = require("bcryptjs");
const express = require("express");
const { getUserByEmail, comparePasswords } = require("../services/user");
const { generateToken } = require("../utils/jwt");
const router = express.Router();

router.post("/", async (req, res) => {
    try 
    {
      const { email, password } = req.body;
      const user = await getUserByEmail(email);
      const message = "Credenciales incorrectas";
      if (user === null)
        return res.status(401).json({ error: message });

      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword)
        return res.status(401).json({ error: message });

      const token = await generateToken(user);
      return res.status(200).json({ token, user });
    } 
    catch (error) 
    {
        const message = "Error en el proceso de login";
        res.status(500).json({ error: message });
    }
  });
  
  module.exports = router;
