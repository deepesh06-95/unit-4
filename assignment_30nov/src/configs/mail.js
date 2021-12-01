// require("dotenv").config();
const nodemailer = require("nodemailer");
module.exports = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 587,
    secure: false, // upgrade later with STARTTLS
    auth: {
      user: "d3be8285f6caf7",
      pass: "7cca7ac92685f9",
    },
  });