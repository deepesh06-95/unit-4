const express = require("express");
const mongoose = require("mongoose");

const connect = require("./configs/db");

const app = express();

app.use(express.json());

const userController = require("./controllers/users.controller");

app.use("/users",userController);

module.exports = app;