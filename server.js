const express = require('express')
const mongoose = require ('mongoose')
const cors = require('cors')

const connectDB = require("./config/db");

// App Config
const app = express();

//Connect Database
connectDB();

const port = process.env.PORT || 5000;

// Middlewares
app.use(express.json({ extended: false }));
app.use(cors())

// Api Endpoints
app.get('/', (req, res) => res.status(200).send("Hello world"))
app.use("/api/users", require("./routes/api/users"));
app.use("/api/menu", require("./routes/api/menu"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/order", require("./routes/api/order"));

// Listener
app.listen(port, () => console.log(`listening in local port ${port}`))