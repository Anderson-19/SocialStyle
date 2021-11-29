require('dotenv').config();
const express = require("express");
const cors = require("cors");
const helmet = require('helmet')

const app = express();

const authRoutes = require("./routes/userRoutes");
const postRoutes = require("./routes/postRoutes");

const port = process.env.PORT || 8000;

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({extended: false}));  

// ---- USERS
app.use("/users",authRoutes);
app.use("/users",authRoutes);

// ---- POSTS
app.use("/posts",postRoutes);
app.use("/posts",postRoutes);
app.use("/posts",postRoutes);
app.use("/posts",postRoutes);



app.use(passport.initialize())
require('./config/passport')(passport)


app.listen(port, () => {
    console.log("Server running at port: " + port);
})
