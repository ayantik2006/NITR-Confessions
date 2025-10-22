const express = require("express");
const app=express();
require("dotenv").config();
const cors=require("cors")
const confessionRouter=require("./routes/confession")
const authRouter=require("./routes/auth");
const mongodb=require("./config/db");
const cookieParser=require("cookie-parser");
app.use(cookieParser(process.env.SECRET));
mongodb();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors({
    origin:process.env.FRONTEND_URL,
    methods:["POST","GET"],
    credentials:true
}))

app.use("/",confessionRouter);
app.use("/auth",authRouter);

app.listen(8080,()=>{
    console.log("server live at port 8080!");    
})