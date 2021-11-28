const express = require("express");

const connect = require("./configs/db");

const usersController = require("./controllers/users.controller");
const studentsController = require("./controllers/students.controller");
const evaluationsController = require("./controllers/evaluations.controller");
const topicsController = require("./controllers/topics.controller");

const app = express();

app.use(express.json());

app.use("/users", usersController);
app.use("/students", studentsController);
app.use("/evaluations", evaluationsController);
app.use("/topics", topicsController);

module.exports = app;
