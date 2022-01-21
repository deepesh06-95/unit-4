const app = require("./app");
const connect = require("./configs/db");

app.listen(3500, async  function(){
    await connect();
    console.log("listening on port 3500");
});