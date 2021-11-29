const app = require("./app");

const connect = require("./configs/db");

app.listen(2550, async function(){
    await connect();
    console.log("listening on port 2550");
});