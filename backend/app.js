const env = require("dotenv")
const express = require("express");
const cors = require("cors");

env.config()
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// PRUEBA BACKEND
app.get("/", (req, res) => {
    const message = "Hola mundo";
    res.json({ message: message });
});

app.listen(PORT, () => {
    console.log(`Running at http://localhost:${PORT}`);
});