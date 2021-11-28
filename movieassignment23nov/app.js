const express = require("express");
const mongoose = require("mongoose");

const connect = () => {
  return mongoose.connect("mongodb://localhost:27017/test");
};

// movies Mongoose
const movieSchema = new mongoose.Schema(
  {
    id: { type: String, required: true },
    movie_name: { type: String, required: true  },
    movie_genre: { type: String, required: true, unique: true },
    production_year: { type: Number, required: true },
    budget: { type: Number, required: true },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const Movie = mongoose.model("movie", movieSchema); // movies

const app = express();

app.use(express.json());


// MOVIES CRUD
app.post("/movies", async (req, res) => {
  try {
    const movie = await Movie.create(req.body);

    return res.status(201).send(movie);
  } catch (e) {
    return res.status(500).json({ message: e.message, status: "Failed" });
  }
});

app.get("/movies", async (req, res) => {
  try {
    const movies = await Movie.find().lean().exec();

    return res.send({ movies });
  } catch (e) {
    return res.status(500).json({ message: e.message, status: "Failed" });
  }
});

app.get("/movies/:id", async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id).lean().exec();

    return res.send(movie);
  } catch (e) {
    return res.status(500).json({ message: e.message, status: "Failed" });
  }
});

app.patch("/movies/:id", async (req, res) => {
  try {
    const movie = await Movie.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    })
      .lean()
      .exec();

    return res.status(201).send(movie);
  } catch (e) {
    return res.status(500).json({ message: e.message, status: "Failed" });
  }
});

app.delete("/movies/:id", async (req, res) => {
  try {
    const movie = await Movie.findByIdAndDelete(req.params.id).lean().exec();

    return res.status(200).send(movie);
  } catch (e) {
    return res.status(500).json({ message: e.message, status: "Failed" });
  }
});


app.listen(2345, async function () {
  await connect();
  console.log("listening on port 2345");
});