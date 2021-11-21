const express = require("express");
const app = express();
const movies = require("./movies.json");
app.use(express.json());

app.get("/",(req,res)=>{
    res.send({movies});
});
app.post("/",(req,res)=>{
    const newMovie = [...movies,req.body];
    console.log(req.body);
    res.send(newMovie);
});
app.patch("/:movie_title",(req,res)=>{
    console.log(req.params.movie_title);
    const newMovie = movies.map((movie)=>{
        if(req.params.movie_title === movie.movie_title)
        {
          if (req?.body?.first_name) movie.first_name = req.body.first_name;
          if (req?.body?.last_name) movie.last_name = req.body.last_name;
          if (req?.body?.movie_title) movie.movie_title = req.body.movie_title;
          if (req?.body?.movie_genre) movie.movie_genre = req.body.movie_genre;
        }
        return movie;
    });
    res.send(newMovie);
});
app.delete("/:movie_title",(req,res)=>{
    const newMovie = movies.filter((movie)=>movie.movie_title!==req.params.movie_title);
    res.send(newMovie);
});
app.get("/:movie_title",(req,res)=>{
    const newMovie = movies.filter((movie)=>movie.movie_title===req.params.movie_title);
    res.send(newMovie);
});
app.listen(2350,function(){
    console.log("listening in port 2350");
});