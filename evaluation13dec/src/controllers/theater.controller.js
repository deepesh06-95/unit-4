const express = require("express");

const Theater = require("../models/theater.model");

const authenticate = require("../middlewares/authenticate");
const authorise = require("../middlewares/authorise");

const router = express.Router();

router.post(
  "/",
  authenticate,
  authorise(["seller", "admin"]),
  async (req, res) => {
    try {
      const user = req.user;

      const theater = await Theater.create({
       name: req.body.name,
       location: req.body.location,
      });

      return res.status(201).json({ theater });
    } catch (e) {
      return res.status(500).json({ status: "failed", message: e.message });
    }
  }
);

router.get("/", async (req, res) => {
  const theaters = await Theater.find().lean().exec();

  return res.send(theaters);
});

module.exports = router;