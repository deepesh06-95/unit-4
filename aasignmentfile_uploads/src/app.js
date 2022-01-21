const express = require("express");
const mongoose = require("mongoose");

const connect = require("./configs/db");

const app = express();

app.use(express.json());

const userController = require("./controllers/users.controller");
const galleryController = require("./controllers/gallery.controller");

app.use("/users",userController);
app.use("/gallery",galleryController);

module.exports = app;