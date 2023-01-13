const express = require('express')
const User = require("../Models/Users")
const Product = require("../Models/Products")
const bcrypt = require("bcryptjs")
const Authenticate = require("../Middleware/Authenticate")
const router = express.Router()
const cookieParser = require('cookie-parser')
router.use(cookieParser())

router.post("/edit", async(req,res)=>{
    try{
    const _id= req.body._id
    const name = req.body.name.toString()
    const number = req.body.number.toString()
    const email = req.body.email.toString()

    const Updateprofile = await User.findByIdAndUpdate({_id:_id},{$set:{name:name,number:number,email:email}})

    if(!Updateprofile){
        return res.status(404).send({message:"Profile Is not Updated"}); }
    else{
        res.send({message:"Profile Is Updated"}); }
    }
    catch(e){
        res.send({message:"Error"})
    }
})
router.post('/removeCookie',(req,res)=>{
    try{
        res.clearCookie('jwtoken').send("cookie is cleared")
        
    }catch(e){
        console.log(e.message)
    }
})
router.post("/login",(req,res)=>{

    const {email,password} = req.body
   //  console.log(req.body)
    User.findOne({email:email,state:true},async (err,user) =>{
      if(user){
        const isMatch = await bcrypt.compare(password[0], user.password)
          if(isMatch){

                token = await user.generateAuthToken();
                res.cookie("jwtoken",token,{
                expires:new Date(Date.now() + 864000000),
                httpOnly:true,
                secure:true,
                sameSite:'none'
               }).send() 
          }
          else{
           //  console.log("Password Did Not Match")
          
           res.send({message:"Incorrect Credienteals"})
          }
      }else{
       //    console.log("User Not Registered")
          res.send({message:"Incorrect Credienteals"})
      }
    })
})

router.post("/register", (req,res)=>{
    console.log(req.body)

    const {name, email, password, number} = req.body

       User.findOne({email:email},(err,user)=>{
       if(user){
           res.send({message:"User Already Registered"})
       }else{
           const user = new User({
               name:name[0],
               number:number[0],
               email:email[0],
               password:password[0],
           })
           user.save(err =>{
               if(err){
                  console.log(err)
                console.log("Hello")
                     res.send(err)
               }
               else{
                   res.send({message:"Successfully Registration"})     
               }
           })
       }
    
       })
    // res.send('my register api')
})

router.get("/login",(req,res)=>{
    res.send("hii login get method")
})
router.get("/home", Authenticate ,async (req,res)=>{
    res.send({rootUser:req.rootUser,message:"on home page"})
})

router.get("/account", Authenticate ,async (req,res)=>{
    res.send({rootUser:req.rootUser,message:"on account page"})
})


router.post("/setproducts", (req,res)=>{
    // console.log(req.body)

    const {image, name, price, desc, category, restaurant} = req.body

       Product.findOne({$and:[{name:name},{restaurant:restaurant}]},(err,product)=>{
       if(product){
           res.send({message:"Iteam Already Exists in this Restaurant"})
       }else{
           const product = new Product({
               image:image,
               name:name,
               price:price,
               desc:desc,
               category:category,
               restaurant:restaurant
           })
           product.save(err =>{
               if(err){
                     res.send(err)
               }
               else{
                   res.send({message:"Successfully Added"})     
               }
           })
       }
    
       })
    // res.send('my register api')
})

router.get('/getproducts',async (req,res)=>{
    try{const items = await Product.find()
    res.send(items)}catch(err){
        res.send(err)
    }
})

module.exports  =router
