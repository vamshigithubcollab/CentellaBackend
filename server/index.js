const express = require("express");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());


app.use("/auth",require("./routes/loginroute"));


app.listen(5000,()=>{
    console.log("listening to port at 5000");
})