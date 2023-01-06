const express = require("express");
const app = express();
const cookieParser = require('cookie-parser')
const path = require('path')
require("./Connection/connection")
const dotenv = require('dotenv')

dotenv.config({path:"././config.env"})

const User = require("./Models/Users") 
app.use(cookieParser())
app.use(express.json())


app.use(require('./router/auth'))

app.use(express.static(path.join(__dirname,'./client/build')))

app.get("*",function(req,res){
    res.sendFile(path.join(__dirname,'./client/build/index.html'))
})

app.listen(process.env.PORT || 9002,()=>{
    console.log(`Be Started at port ${process.env.PORT}`)
 })