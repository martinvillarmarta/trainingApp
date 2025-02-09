const env = require("dotenv")
const express = require("express");
const cors = require("cors");
const loginRoute = require("./routes/loginRoute");
const userWorkoutRoute = require("./routes/userWorkoutRoute");

env.config()
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json()); //content-type: application/json

app.use("/api/login", loginRoute);
app.use("/api/user", userWorkoutRoute);

app.listen(PORT, () => {
    console.log(`Running at http://localhost:${PORT}`);
});