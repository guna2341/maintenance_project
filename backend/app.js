const express = require("express");
require("dotenv").config();
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());
const api = process.env.API_URL;
const port = process.env.PORT || 5000;
const database = require("./config/db");

database();

const blockRoutes = require("./routes/blockRoute");
const loginRoutes = require("./routes/loginRoutes");

app.use(`/${api}/blocks`, blockRoutes);
app.use(`/${api}/auth`, loginRoutes);

app.get("/", async (req, res) => {
    return res.json("Hello");
} )

app.listen(port, () => { 
    console.log(`Server is running on port ${port}`);
});