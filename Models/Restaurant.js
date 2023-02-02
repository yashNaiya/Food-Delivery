const mongoose =require('mongoose')

const restaurant = mongoose.Schema({
    name:{
        type:String,
        require:true
    }
})
const Restaurant = mongoose.model('Restaurant',restaurant)

module.exports =  Restaurant