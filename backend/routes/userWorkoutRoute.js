const express = require("express");
const { getWorkoutsByUserIdAndDates, addWorkoutToUser } = require("../services/userWorkoutService");
const { validateToken } = require("../utils/jwt");
const router = express.Router();

router.get("/:userId/workouts", async (req, res) => 
{
    try
    {
        const userId = req.params.userId;
        const { startDate, endDate } = req.query;
        const workouts = await getWorkoutsByUserIdAndDates(userId, startDate, endDate);
        res.json(workouts);
    }
    catch (error) 
    {
        const message = "Error al obtener los entrenamientos del usuario";
        console.error(message + error);
        res.status(500).json({ error: message });
    }
});
    
router.post("/:userId/workouts", async (req, res) => 
{
    try 
    {
      const { userId } = req.params;
      const { title, date } = req.body;

      const token = req.headers.authorization?.split(" ")[1];
      const isValid = validateToken(token);
      if (!isValid)
      {
        res.status(401).json({ valid: false });
      } 

      await addWorkoutToUser(userId, title, date);   
      res.status(201).json({ message: "Entrenamiento guardado correctamente" });
    } 
    catch (error) 
    {
        const message = "Error al guardar el entrenamiento";
        console.error(message + error);
        res.status(500).json({ error: message });
    }
});

module.exports = router;
