const express = require("express");
const userRouter = require("./Router/users")
const bookRouter = require("./Router/books")
const dotenv = require('dotenv');

const Dbconnection = require("./DataBaseconnection")

const PORT=8081;
const app = express()

app.use(express.json()) 

dotenv.config(); 

app.use("/users",userRouter)
app.use("/books",bookRouter)
Dbconnection();

app.get("/",(req,res)=>{ 
    res.status(200).json({
        message: "Server started"
    })
})

app.all("*",(req,res)=>{
    res.status(500).json({
        message: "this route not added yet"
    }) 
})
 app.listen(PORT,()=>{
    console.log(`Server working on port ${PORT}`)
 })