const mongoose = require("mongoose")

const order = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users"
    },
    order:[
        {
            type: mongoose.Schema.Types.Mixed,
            ref:"Users"
        }
    ],
    total:{
        type:Number,
        require:true
    },
    dateTime:{
        type:String,
        require:true
    },
    Instructions:{
        type:String
    },
    state:{
        type:Boolean,
        default:false
    }

})

const Orders = mongoose.model("Orders",order)

module.exports = Orders