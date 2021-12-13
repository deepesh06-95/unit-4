const express = require("express");

const Show = require("../models/show.model");

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

      const show = await Show.create({
        timing: req.body.timing,
        movie: req.body.movie,
        total_seats: req.body.total_seats,
        screen: req.body.screen,
      });

      return res.status(201).json({ show });
    } catch (e) {
      return res.status(500).json({ status: "failed", message: e.message });
    }
  }
);

router.get("/", async (req, res) => {
  const shows = await Show.find().lean().exec();

  return res.send(shows);
});

router.get("/nearest", async (req, res) => {
  const shows = await Show.find({"screen":{$eq:"61b725dfdc7e0435319a163c"}}).lean().exec();

  return res.send(shows);
});

module.exports = router;