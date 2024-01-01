const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({

    productName: {
        type: String,
        required: [true, "Your product name is required"],
    },
    image: {
        type: Array,
        default: [],
    },
    description: {
        type: String,
        required: [true, "Your description is required"],
    },
    price: {
        type: Number,
        required: [true, "Your state is price"],
    },
    createdAt: {
        type: Date,
        default: new Date(),
    },
});


module.exports = mongoose.model("Product", productSchema);