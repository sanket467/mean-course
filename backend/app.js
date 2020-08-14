const express = require('express');
const bodyParser = require('body-parser');
const Post = require('../models/posts');
const mongoose = require('mongoose');
const path = require('path');

const postRoutes = require('./routes/posts');
const userRoutes = require('./routes/user');

const app = express();

mongoose.connect("mongodb+srv://sanket:p8uUvN5gxYSJ9Dvy@cluster0.urxep.mongodb.net/node-angular?retryWrites=true&w=majority")
    .then(() => {
        console.log("Connecting Successfully to DataBase !!!");
    })
    .catch(() => {
        console.log("Connection failed to DB");
    });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/images", express.static(path.join("backend/images")));



app.use((req, res, next) => {

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept");

    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST ,PUT,  PATCH, DELETE, OPTIONS"
    );
    next();

});



app.use("/api/posts", postRoutes);
app.use("/api/user", userRoutes);
module.exports = app;