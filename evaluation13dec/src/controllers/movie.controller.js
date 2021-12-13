const express = require("express");

const Movie = require("../models/movie.model");

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

      const movie = await Movie.create({
        name: req.body.name,
        actors : req.body.actors,
        languages: req.body.languages,
        directors: req.body.directors,
        poster_urls:["www.google.com"],
      });

      return res.status(201).json({ movie });
    } catch (e) {
      return res.status(500).json({ status: "failed", message: e.message });
    }
  }
);

router.get("/", async (req, res) => {
  const movies = await Movie.find().lean().exec();

  return res.send(movies);
});
router.get("/actor", async (req, res) => {
  const movies = await Movie({"actors":{$eq:"akshay"}}).lean().exec();

  return res.send(movies);
});

module.exports = router;