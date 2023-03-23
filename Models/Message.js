const mongoose = require("mongoose")

const message = new mongoose.Schema({
    name:{type:String},
    email:{type:String},
    subject:{type:String},
    message:{type:String}
})

const Messages = mongoose.model("Messages",message)

module.exports = Messages