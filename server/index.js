require('dotenv').config();
const express = require("express");
const cors = require("cors");
const helmet = require('helmet')

const app = express();

const authRoutes = require("./routes/userRoutes");
const postRoutes = require("./routes/postRoutes");
const searchRoutes = require("./routes/searchRoutes");


const port = process.env.PORT || 8000;

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({extended: false}));  

// ---- USERS
app.use("/users",authRoutes);
app.use("/users",authRoutes);

// ---- POST
app.use("/post",postRoutes);
app.use("/post",postRoutes);
app.use("/post",postRoutes);
app.use("/post",postRoutes);

// ---- SEARCH
app.use("/search",searchRoutes);
app.use("/search",searchRoutes);


app.listen(port, () => {
    console.log("Server running at port: " + port);
})
