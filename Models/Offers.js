const mongoose = require("mongoose")

const offer = new mongoose.Schema({
   
    type: mongoose.Schema.Types.Mixed

})

const Offers = mongoose.model("Offers", offer);

module.exports = Offers;