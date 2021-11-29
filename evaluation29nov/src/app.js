const express = require("express");
const mongoose = require("mongoose");

const connect = require("./configs/db");

//creating schemas & models
// const User = require("./models/user.model");

// const Company = require("./models/company.model");

// const Job = require("./models/job.model");

// const Skill = require("./models/skill.model");

const app = express();

app.use(express.json());

//crud operation
const usersController = require("./controllers/users.controller");
const companysController = require("./controllers/companys.controller");
const skillsController = require("./controllers/skills.controller");
const jobsController = require("./controllers/jobs.controller");

app.use("/users",usersController);
app.use("/companys",companysController);
app.use("/skills",skillsController);
app.use("/jobs",jobsController);

module.exports = app;

