// env
require("dotenv").config();

// packages
const express = require("express");
const cors = require("cors");

// initialize app
const app = express();

// cors
app.use(cors({
    origin: "*"
}));

// body-parser
app.use(express.json());

// Base_url
const api = process.env.API_URL;

// port
const port = process.env.PORT;

// services
const { connectMqtt, publishMessage } = require("./services/mqtt");
connectMqtt();

// database
const database = require("./config/db");
database();

// routes
const blockRoutes = require("./routes/blockRoute");
const loginRoutes = require("./routes/loginRoutes");
const statusRoute = require("./routes/statusRoute");

app.use("/test",(req,res) => {
    publishMessage("AcerDevices/block/floor/room/status","ON");
});

// mount router
app.use(`/${api}/blocks`, blockRoutes);
app.use(`/${api}/auth`, loginRoutes);
app.use(`/${api}/switchStatus`, statusRoute );
app.get("/", async (req, res) => {
    return res.json("Hello");
});

// server
app.listen(port, () => { 
    console.log(`Server is running on port ${port}`);
});