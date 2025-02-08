const env = require("dotenv")
const express = require("express");
const cors = require("cors");
const DBconexion = require("./db/database.js");

env.config()
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json()); //content-type: application/json

DBconexion();

app.listen(PORT, () => {
    console.log(`Running at http://localhost:${PORT}`);
});