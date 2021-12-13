const express = require("express");

const Seat = require("../models/seat.model");

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

      const seat = await Seat.create({
        show: req.body.show,
        user_id : user.user._id
      });

      return res.status(201).json({ seat });
    } catch (e) {
      return res.status(500).json({ status: "failed", message: e.message });
    }
  }
);

router.get("/", async (req, res) => {
  const seats = await Seat.find().lean().exec();

  return res.send(seats);
});

module.exports = router;