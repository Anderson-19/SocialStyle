require('dotenv').config();
const express = require("express");
const cors = require("cors");
const helmet = require('helmet')

const app = express();

const authRoutes = require("./routes/userRoutes");
const postRoutes = require("./routes/postRoutes");
const postCommentRoutes = require("./routes/postCommentRoutes");

let whitelist = ['http://localhost:19006/'];
const port = process.env.PORT || 8000;

const config = {
    credentials: true,
    origin: function (origin, callback) {
      if (whitelist.indexOf(origin) !== -1 || !origin) {
        callback(null, true)
      } else {
        callback(new Error('Not allowed by CORS'))
      }
    },
    methods:'GET,POST,DELETE,PUT,OPTIONS'
} 

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({extended: false}));  

// ---- USERS
app.use("/users",authRoutes);
app.use("/users",authRoutes);
app.use("/users",authRoutes);

// ---- Follower
app.use("/users",authRoutes);
app.use("/users",authRoutes);
app.use("/users",authRoutes);

// ---- POST
app.use("/post",postRoutes);
app.use("/post",postRoutes);
app.use("/post",postRoutes);
app.use("/post",postRoutes);
app.use("/post",postRoutes);
app.use("/post",postRoutes);

// ---- POST COMMENT
app.use("/postComment",postCommentRoutes);
app.use("/postComment",postCommentRoutes);
app.use("/postComment",postCommentRoutes);


app.listen(port, () => {
    console.log("Server running at port: " + port);
})






