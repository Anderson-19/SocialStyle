require('dotenv').config();
const express = require("express");
const cors = require("cors");
const helmet = require('helmet')

const app = express();

const authRoutes = require("./routes/userRoutes");

const port = process.env.PORT || 8000;

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({extended: false}));  

// ---- USERS
app.use("/users",authRoutes);


app.listen(port, () => {
    console.log("Server running at port: " + port);
})
