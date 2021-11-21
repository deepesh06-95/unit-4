const express = require("express");
const app = express();
const users = require("../users.json");
app.use(express.json());

app.get("/",(req,res)=>{
    res.send({users});
});

app.post("/",(req,res)=>{
    const newUsers=[...users,req.body];
    res.send(newUsers);
})

app.listen(2435,function(){
    console.log("listening on PORT 2435");
});
