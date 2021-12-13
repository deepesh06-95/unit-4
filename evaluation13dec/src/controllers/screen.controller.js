const express = require("express");

const Screen = require("../models/screen.model");

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
      const screen = await Screen.create({
        name: req.body.name,
        theater: req.body.theater,
        user_id : user.user._id
      });

      return res.status(201).json({ screen });
    } catch (e) {
      return res.status(500).json({ status: "failed", message: e.message });
    }
  }
);

router.get("/", async (req, res) => {
  const screens = await Screen.find().lean().exec();

  return res.send(screens);
});

module.exports = router;