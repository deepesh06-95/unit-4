const express = require("express");
const app = express();
const users = require("./users.json");
// app.use(express.json());

app.get("/",(req,res)=>{
    res.send("Welcome to Home page");
});
app.get("/",(req,res)=>{
    res.send({users});
});


app.listen(2430,function(){
    console.log("listening on PORT 2430");
});
