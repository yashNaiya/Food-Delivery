const mongoose = require("mongoose")

const product = new mongoose.Schema({
    image: {
        type: String,
        required: true,

    },
    name: {
        type: String,
        required: true,

    },
    price: {
        type: Number,
        required: true,
    },

    desc: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },   
    restaurant: {
        type: String,
        required: true
    },

})

const Products = mongoose.model("Products", product);

module.exports = Products;