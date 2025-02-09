const express = require("express");
const { getWorkoutsByUserIdAndDates } = require("../services/userWorkoutService");
const { validateToken } = require("../utils/jwt");
const router = express.Router();

router.get("/:userId/workouts", async (req, res) => {
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
        console.log(message + error);
        res.status(500).json({ error: message });
    }
});
    
module.exports = router;
